#!/bin/bash
# package-unsigned-mac.sh — Build ad-hoc-signed macOS apps for testing.
#
# Added by Yamato Security, 2026-11-04 (2026-11-05: checks the DuckDB bindings; one app per
# architecture instead of one universal app; zip only, no disk image).
#
# Usage: scripts/package-unsigned-mac.sh [arm64] [x64] [universal]     (default: x64 arm64)
#   arm64      Apple silicon Macs
#   x64        Intel Macs
#   universal  one app for both, about twice the size of either
#
# Writes to release/unsigned/ one zip per architecture <arch>, plus SHA256SUMS.txt for all:
#   <name>-<version><suffix>-mac-<arch>.zip   the .app, ad-hoc signed, zipped with ditto <name>/<version> come from package.json; BUILD_SUFFIX
# (optional, e.g. "+g1a2b3c4") marks development builds. Run `npm run build:renderer` and
# `npm run bundle:tools` first, or use `npm run dist:unsigned`, which does both.
#
# The bundled Hayabusa and DuckDB's native library are universal files. An arm64 or x64 app
# keeps only its own architecture's half of each, and only its own DuckDB package.
#
# The result is NOT notarized and carries no Developer ID signature, so Gatekeeper blocks
# the first launch. Allow it once under System Settings → Privacy & Security → Open Anyway,
# or clear the quarantine flag:
#   xattr -dr com.apple.quarantine "/Applications/IRFlow Timeline.app"
# Needs macOS with the Xcode command-line tools (codesign, ditto, lipo).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
[ "$(uname -s)" = "Darwin" ] || { echo "ERROR: this script packages a macOS app and must run on macOS"; exit 1; }
[ -f dist/index.html ] || { echo "ERROR: dist/ is missing — run 'npm run build:renderer' first"; exit 1; }

TARGETS=("$@")
[ ${#TARGETS[@]} -gt 0 ] || TARGETS=(x64 arm64)
for target in "${TARGETS[@]}"; do
  case "$target" in
    arm64|x64|universal) ;;
    *) echo "ERROR: unknown architecture '$target' (use arm64, x64 or universal)"; exit 1 ;;
  esac
done

PKG_NAME="$(node -p "require('./package.json').name")"
PKG_VERSION="$(node -p "require('./package.json').version")"
PRODUCT_NAME="$(node -p "require('./electron-builder.config.cjs').productName")"
OUT_DIR="$ROOT/release/unsigned"

# Architectures of a Mach-O file, sorted, e.g. "arm64 x86_64".
archs_of() { lipo -archs "$1" | tr ' ' '\n' | sed '/^$/d' | sort | paste -sd ' ' -; }

package_one() {
  local target="$1" expect build_dir lipo_arch=""
  case "$target" in
    arm64)     lipo_arch="arm64";  expect="arm64";        build_dir="mac-arm64" ;;
    x64)       lipo_arch="x86_64"; expect="x86_64";       build_dir="mac" ;;
    universal) expect="arm64 x86_64"; build_dir="mac-universal" ;;
  esac
  local label="${PKG_NAME}-${PKG_VERSION}${BUILD_SUFFIX:-}-mac-${target}"

  echo "==> Building ${PRODUCT_NAME} ${PKG_VERSION}${BUILD_SUFFIX:-} (${target}, unsigned)"
  rm -rf "$ROOT"/release/mac*
  # No Developer ID certificate here: skip electron-builder's signing and notarization hooks
  # and never let it publish anything. IRFLOW_MAC_ARCH leaves the other architecture's DuckDB
  # package out of a single-architecture app (electron-builder.config.cjs).
  if [ "$target" = universal ]; then
    SKIP_NOTARIZE=1 CSC_IDENTITY_AUTO_DISCOVERY=false \
      npx electron-builder --config electron-builder.config.cjs --mac dir --universal --publish never
  else
    IRFLOW_MAC_ARCH="$target" SKIP_NOTARIZE=1 CSC_IDENTITY_AUTO_DISCOVERY=false \
      npx electron-builder --config electron-builder.config.cjs --mac dir "--$target" --publish never
  fi

  local app="$ROOT/release/$build_dir/${PRODUCT_NAME}.app"
  [ -d "$app" ] || { echo "ERROR: no ${PRODUCT_NAME}.app in release/$build_dir"; find "$ROOT/release" -maxdepth 2 | head -20; exit 1; }
  echo "==> App bundle: $app"

  if [ -n "$lipo_arch" ]; then
    echo "==> Keeping only the $lipo_arch half of universal files"
    local f archs tmp
    while IFS= read -r -d '' f; do
      archs="$(archs_of "$f" 2>/dev/null)" || continue
      case "$archs" in *" "*) ;; *) continue ;; esac   # one architecture: nothing to drop
      case " $archs " in
        *" $lipo_arch "*) ;;
        *) echo "ERROR: ${f#"$app"/} has no $lipo_arch code ($archs)"; exit 1 ;;
      esac
      tmp="$(mktemp)"
      lipo "$f" -thin "$lipo_arch" -output "$tmp"
      cp "$tmp" "$f"   # cp onto the existing file keeps its permissions
      rm -f "$tmp"
      # The half keeps its own signature; sign it ad hoc if it has none, since Apple silicon
      # refuses unsigned code.
      codesign --verify "$f" 2>/dev/null || codesign --force --sign - "$f"
      echo "    ${f#"$app"/}: $archs -> $lipo_arch"
    done < <(find "$app/Contents/Resources" -type f \( -perm -u+x -o -name '*.dylib' -o -name '*.node' -o -name '*.so' \) -print0)
  fi

  echo "==> Ad-hoc signing (Apple silicon refuses to run unsigned native code)"
  codesign --force --deep --sign - "$app"
  codesign --verify --deep --strict --verbose=2 "$app"

  local main_archs
  main_archs="$(archs_of "$app/Contents/MacOS/${PRODUCT_NAME}")"
  echo "==> Main executable architectures: $main_archs"
  [ "$main_archs" = "$expect" ] || { echo "ERROR: expected $expect, got $main_archs"; exit 1; }

  # DuckDB's native library is loaded from disk, unpacked from app.asar. Without the package
  # for the app's architecture the app cannot open a tab (see scripts/ensure-duckdb-bindings.cjs).
  local unpacked="$app/Contents/Resources/app.asar.unpacked/node_modules/@duckdb" a dir
  for a in x64 arm64; do
    dir="$unpacked/node-bindings-darwin-$a"
    if [ "$target" = universal ] || [ "$target" = "$a" ]; then
      [ -f "$dir/libduckdb.dylib" ] && [ -f "$dir/duckdb.node" ] \
        || { echo "ERROR: DuckDB binding for darwin-$a is missing from the app"; ls -la "$unpacked" || true; exit 1; }
      echo "==> DuckDB darwin-$a: $(archs_of "$dir/libduckdb.dylib")"
      if [ "$target" != universal ] && [ "$(archs_of "$dir/libduckdb.dylib")" != "$expect" ]; then
        echo "ERROR: DuckDB library is not $expect only"; exit 1
      fi
    elif [ -e "$dir" ]; then
      echo "ERROR: the $target app should not contain the darwin-$a DuckDB binding"; exit 1
    fi
  done

  local hayabusa="$app/Contents/Resources/hayabusa/hayabusa"
  if [ -f "$hayabusa" ]; then
    echo "==> Hayabusa: $(archs_of "$hayabusa")"
    [ "$(archs_of "$hayabusa")" = "$expect" ] || { echo "ERROR: expected a $expect Hayabusa"; exit 1; }
  fi

  mkdir -p "$OUT_DIR"
  echo "==> Zipping"
  ditto -c -k --sequesterRsrc --keepParent "$app" "$OUT_DIR/${label}.zip"
  du -h "$app" | tail -1 | sed 's/^/==> App size: /'
}

rm -rf "$ROOT/release"
for target in "${TARGETS[@]}"; do
  package_one "$target"
done

(cd "$OUT_DIR" && shasum -a 256 ./*.zip | sed 's#\./##' > SHA256SUMS.txt && cat SHA256SUMS.txt)
ls -l "$OUT_DIR"
echo "==> Done: $OUT_DIR"
