#!/bin/bash
# package-unsigned-mac.sh — Build an ad-hoc-signed universal macOS app for testing.
#
# Added by Yamato Security, 2026-11-04 (2026-11-05: checks both DuckDB bindings). Writes to release/unsigned/:
#   <name>-<version><suffix>-mac-universal.zip   the .app, ad-hoc signed, zipped with ditto
#   <name>-<version><suffix>-mac-universal.dmg   the same app on a read-only disk image
#   SHA256SUMS.txt
# <name>/<version> come from package.json; BUILD_SUFFIX (optional, e.g. "+g1a2b3c4") marks
# development builds. Run `npm run build:renderer` and `npm run bundle:tools` first, or use
# `npm run dist:unsigned`, which does both.
#
# The result is NOT notarized and carries no Developer ID signature, so Gatekeeper blocks
# the first launch. Allow it once under System Settings → Privacy & Security → Open Anyway,
# or clear the quarantine flag:
#   xattr -dr com.apple.quarantine "/Applications/IRFlow Timeline.app"
# Needs macOS with the Xcode command-line tools (codesign, ditto, hdiutil, lipo).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
[ "$(uname -s)" = "Darwin" ] || { echo "ERROR: this script packages a macOS app and must run on macOS"; exit 1; }
[ -f dist/index.html ] || { echo "ERROR: dist/ is missing — run 'npm run build:renderer' first"; exit 1; }

PKG_NAME="$(node -p "require('./package.json').name")"
PKG_VERSION="$(node -p "require('./package.json').version")"
PRODUCT_NAME="$(node -p "require('./electron-builder.config.cjs').productName")"
LABEL="${PKG_NAME}-${PKG_VERSION}${BUILD_SUFFIX:-}-mac-universal"
OUT_DIR="$ROOT/release/unsigned"

echo "==> Building ${PRODUCT_NAME} ${PKG_VERSION}${BUILD_SUFFIX:-} (universal, unsigned)"
rm -rf "$ROOT/release"
# No Developer ID certificate here: skip electron-builder's signing and notarization hooks
# and never let it publish anything.
SKIP_NOTARIZE=1 CSC_IDENTITY_AUTO_DISCOVERY=false \
  npx electron-builder --config electron-builder.config.cjs --mac dir --universal --publish never

APP_PATH="$(find "$ROOT/release" -maxdepth 2 -type d -name "${PRODUCT_NAME}.app" | head -n 1)"
[ -n "$APP_PATH" ] && [ -d "$APP_PATH" ] || { echo "ERROR: no ${PRODUCT_NAME}.app under release/"; find "$ROOT/release" -maxdepth 2 | head -20; exit 1; }
echo "==> App bundle: $APP_PATH"

echo "==> Ad-hoc signing (Apple silicon refuses to run unsigned native code)"
codesign --force --deep --sign - "$APP_PATH"
codesign --verify --deep --strict --verbose=2 "$APP_PATH"

# Both DuckDB native libraries must ship, unpacked from app.asar, or the app cannot open a tab
# on one of the two architectures (see scripts/ensure-duckdb-bindings.cjs).
UNPACKED="$APP_PATH/Contents/Resources/app.asar.unpacked/node_modules/@duckdb"
for arch in x64 arm64; do
  lib="$UNPACKED/node-bindings-darwin-$arch/libduckdb.dylib"
  [ -f "$lib" ] && [ -f "$UNPACKED/node-bindings-darwin-$arch/duckdb.node" ] \
    || { echo "ERROR: DuckDB binding for darwin-$arch is missing from the app"; ls -la "$UNPACKED" || true; exit 1; }
  echo "==> DuckDB darwin-$arch: $(lipo -archs "$lib")"
done

MAIN_BIN="$APP_PATH/Contents/MacOS/${PRODUCT_NAME}"
ARCHS="$(lipo -archs "$MAIN_BIN")"
echo "==> Main executable architectures: $ARCHS"
case "$ARCHS" in
  *x86_64*arm64*|*arm64*x86_64*) ;;
  *) echo "ERROR: expected a universal (x86_64 + arm64) executable"; exit 1 ;;
esac

mkdir -p "$OUT_DIR"
echo "==> Zipping"
ditto -c -k --sequesterRsrc --keepParent "$APP_PATH" "$OUT_DIR/${LABEL}.zip"

echo "==> Creating disk image"
STAGE="$(mktemp -d)"
cp -R "$APP_PATH" "$STAGE/"
ln -s /Applications "$STAGE/Applications"
hdiutil create -volname "$PRODUCT_NAME" -srcfolder "$STAGE" -ov -format UDZO -quiet "$OUT_DIR/${LABEL}.dmg"
rm -rf "$STAGE"

(cd "$OUT_DIR" && shasum -a 256 ./*.zip ./*.dmg | sed 's#\./##' > SHA256SUMS.txt && cat SHA256SUMS.txt)
echo "==> Done: $OUT_DIR"
