// Modified by Yamato Security, 2026-11-04: added the Spring, Summer, Autumn and Winter
// color schemes, the `base` token on every theme, and the THEME_OPTIONS catalog/helpers
// that drive the Color Scheme menus (see electron/themes.js for the main-process mirror).

/**
 * Color schemes.
 *
 * Every scheme defines the same token set. `base` says whether the scheme is a dark or a
 * light design — components that only know two moods (context-menu glass, the
 * `color-scheme` CSS property, the timeline palettes) branch on `base`, never on the name.
 *
 * Text-contrast guarantees, enforced by tests/color-schemes.test.js (WCAG 2.x ratios):
 *   text / bg ≥ 7, textDim / bg ≥ 4.5, textMuted / bg ≥ 4.5, headerText / headerBg ≥ 4.5,
 *   accent, success, warning, danger and every severity color / bg ≥ 3.
 */
export const THEMES = {
  dark: {
    base: "dark",
    bg: "#0f1114", bgAlt: "#181b20", bgInput: "#12151a", border: "#2a2d33", borderAccent: "#E85D2A",
    text: "#e0ddd8", textDim: "#b0aaa4", textMuted: "#948e88", accent: "#E85D2A", accentHover: "#F47B50",
    rowOdd: "#141720", rowEven: "#0f1114", headerBg: "#181b20", headerText: "#E85D2A",
    selection: "rgba(232,93,42,0.14)", bookmark: "rgba(232,93,42,0.06)",
    modalBg: "#181b20", modalBorder: "#333639", overlay: "rgba(5,5,8,0.85)",
    success: "#4ade80", warning: "#F5A623", danger: "#f85149",
    btnBg: "#22252a", btnBorder: "#333639",
    // Unit 42 extended palette
    panelBg: "#0b0d10", cellBorder: "#12151a", accentSubtle: "rgba(232,93,42,0.12)",
    histBar: "#E85D2A", histBarHover: "#F47B50", histGrid: "#1e2028",
    primaryBtn: "#E85D2A", primaryBtnHover: "#C44D1E",
    toolbarBg: "rgba(24,27,32,0.82)", glassBg: "rgba(255,255,255,0.05)", glassBorder: "rgba(255,255,255,0.08)", glassHover: "rgba(255,255,255,0.10)",
    // Severity palette — used by SUS_COLORS, INT_COLOR, PI_SEV_COLORS, IOC verdicts.
    // Distinct from brand `accent` (which is #E85D2A): severity needs cooler reds, deeper amber, etc.
    sev: { critical: "#f85149", high: "#f0883e", med: "#d29922", low: "#8b949e", custom: "#a371f7", clean: "#3fb950", info: "#58a6ff" },
  },
  light: {
    base: "light",
    bg: "#ffffff", bgAlt: "#f7f5f3", bgInput: "#ffffff", border: "#e0dbd6", borderAccent: "#B84317",
    text: "#1c1917", textDim: "#554f4a", textMuted: "#6f6862", accent: "#B84317", accentHover: "#963512",
    rowOdd: "#faf8f6", rowEven: "#ffffff", headerBg: "#f7f5f3", headerText: "#B84317",
    selection: "rgba(232,93,42,0.10)", bookmark: "rgba(232,93,42,0.06)",
    modalBg: "#ffffff", modalBorder: "#e0dbd6", overlay: "rgba(28,25,23,0.5)",
    success: "#15803d", warning: "#9A5B00", danger: "#dc2626",
    btnBg: "#f0ebe6", btnBorder: "#e0dbd6",
    // Unit 42 extended palette
    panelBg: "#f0ebe6", cellBorder: "#ebe6e0", accentSubtle: "rgba(232,93,42,0.08)",
    histBar: "#B84317", histBarHover: "#963512", histGrid: "#e0dbd6",
    primaryBtn: "#B84317", primaryBtnHover: "#963512",
    toolbarBg: "rgba(247,245,243,0.82)", glassBg: "rgba(0,0,0,0.03)", glassBorder: "rgba(0,0,0,0.06)", glassHover: "rgba(0,0,0,0.08)",
    sev: { critical: "#dc2626", high: "#cc4400", med: "#92400e", low: "#554f4a", custom: "#6d28d9", clean: "#15803d", info: "#1d4ed8" },
  },
  // ── Seasonal schemes ─────────────────────────────────────────────────────────
  // Spring — new leaves on a pale, sunlit background; a touch of cherry blossom for
  // bookmarks and custom tags.
  spring: {
    base: "light",
    bg: "#f6fbf3", bgAlt: "#e9f4e3", bgInput: "#ffffff", border: "#c9dfc0", borderAccent: "#2e8b3d",
    text: "#172315", textDim: "#3d5739", textMuted: "#53704f", accent: "#2e8b3d", accentHover: "#246f31",
    rowOdd: "#eff7ea", rowEven: "#f6fbf3", headerBg: "#e3f0dc", headerText: "#1f6e36",
    selection: "rgba(46,139,61,0.16)", bookmark: "rgba(217,83,138,0.10)",
    modalBg: "#ffffff", modalBorder: "#c9dfc0", overlay: "rgba(23,35,21,0.5)",
    success: "#1f7a33", warning: "#9a6200", danger: "#bf3a2b",
    btnBg: "#e9f4e3", btnBorder: "#c9dfc0",
    panelBg: "#e9f4e3", cellBorder: "#dcebd5", accentSubtle: "rgba(46,139,61,0.12)",
    histBar: "#3fa34d", histBarHover: "#2e8b3d", histGrid: "#d6e8cf",
    primaryBtn: "#2e8b3d", primaryBtnHover: "#246f31",
    toolbarBg: "rgba(233,244,227,0.85)", glassBg: "rgba(46,139,61,0.05)", glassBorder: "rgba(46,139,61,0.14)", glassHover: "rgba(46,139,61,0.10)",
    sev: { critical: "#b3261e", high: "#b9410a", med: "#8a5a00", low: "#5b6b5a", custom: "#b4336f", clean: "#1f7a33", info: "#1f5fa8" },
  },
  // Summer — deep ocean water with bright surf, seafoam and sand.
  summer: {
    base: "dark",
    bg: "#06192b", bgAlt: "#0b2540", bgInput: "#082036", border: "#164366", borderAccent: "#22b8e6",
    text: "#e6f4fb", textDim: "#a9cde0", textMuted: "#7fa8c0", accent: "#22b8e6", accentHover: "#5ad0f5",
    rowOdd: "#09213a", rowEven: "#06192b", headerBg: "#0b2540", headerText: "#4fd1ff",
    selection: "rgba(34,184,230,0.16)", bookmark: "rgba(245,199,106,0.10)",
    modalBg: "#0b2540", modalBorder: "#1b4d75", overlay: "rgba(2,10,20,0.85)",
    success: "#3ddc97", warning: "#f5c76a", danger: "#ff6b6b",
    btnBg: "#10304d", btnBorder: "#1b4d75",
    panelBg: "#04121f", cellBorder: "#0d2a45", accentSubtle: "rgba(34,184,230,0.12)",
    histBar: "#22b8e6", histBarHover: "#5ad0f5", histGrid: "#123a5a",
    primaryBtn: "#1aa3d1", primaryBtnHover: "#22b8e6",
    toolbarBg: "rgba(11,37,64,0.82)", glassBg: "rgba(120,200,255,0.06)", glassBorder: "rgba(120,200,255,0.12)", glassHover: "rgba(120,200,255,0.12)",
    sev: { critical: "#ff6b6b", high: "#ff9f43", med: "#f5c76a", low: "#8fb3c9", custom: "#c792ea", clean: "#3ddc97", info: "#4fd1ff" },
  },
  // Autumn — pumpkin orange and harvest gold on dark roasted browns, with a Halloween
  // purple for custom tags.
  autumn: {
    base: "dark",
    bg: "#1a110b", bgAlt: "#251911", bgInput: "#1f140d", border: "#3d2a1c", borderAccent: "#ff7a1a",
    text: "#f5e9d8", textDim: "#d2b89a", textMuted: "#ab8d6b", accent: "#ff7a1a", accentHover: "#ff9640",
    rowOdd: "#20150e", rowEven: "#1a110b", headerBg: "#251911", headerText: "#ff8c33",
    selection: "rgba(255,122,26,0.16)", bookmark: "rgba(230,168,35,0.10)",
    modalBg: "#251911", modalBorder: "#4a3322", overlay: "rgba(10,6,3,0.85)",
    success: "#8fbf3f", warning: "#e6a823", danger: "#e5484d",
    btnBg: "#2e1f15", btnBorder: "#4a3322",
    panelBg: "#140d08", cellBorder: "#2a1c12", accentSubtle: "rgba(255,122,26,0.12)",
    histBar: "#ff7a1a", histBarHover: "#ff9640", histGrid: "#33231a",
    primaryBtn: "#e0680f", primaryBtnHover: "#ff7a1a",
    toolbarBg: "rgba(37,25,17,0.82)", glassBg: "rgba(255,170,90,0.06)", glassBorder: "rgba(255,170,90,0.12)", glassHover: "rgba(255,170,90,0.12)",
    sev: { critical: "#e5484d", high: "#ff7a1a", med: "#e6a823", low: "#a68b6f", custom: "#b388eb", clean: "#8fbf3f", info: "#8fb4d9" },
  },
  // Winter — fresh snow and ice with Christmas red, pine green and a little gold.
  winter: {
    base: "light",
    bg: "#fbfdff", bgAlt: "#eef4fa", bgInput: "#ffffff", border: "#cfdceb", borderAccent: "#c41e3a",
    text: "#15202b", textDim: "#3d4f61", textMuted: "#56687a", accent: "#c41e3a", accentHover: "#a3172f",
    rowOdd: "#f3f7fb", rowEven: "#fbfdff", headerBg: "#e4efe8", headerText: "#146b3a",
    selection: "rgba(20,107,58,0.14)", bookmark: "rgba(196,30,58,0.08)",
    modalBg: "#ffffff", modalBorder: "#cfdceb", overlay: "rgba(21,32,43,0.5)",
    success: "#146b3a", warning: "#9c6a00", danger: "#b3122e",
    btnBg: "#eef4fa", btnBorder: "#cfdceb",
    panelBg: "#eef4fa", cellBorder: "#e1eaf3", accentSubtle: "rgba(196,30,58,0.08)",
    histBar: "#146b3a", histBarHover: "#0f5a30", histGrid: "#d9e4ee",
    primaryBtn: "#c41e3a", primaryBtnHover: "#a3172f",
    toolbarBg: "rgba(238,244,250,0.85)", glassBg: "rgba(20,60,120,0.04)", glassBorder: "rgba(20,60,120,0.10)", glassHover: "rgba(20,60,120,0.08)",
    sev: { critical: "#b3122e", high: "#b9410a", med: "#8a5a00", low: "#56687a", custom: "#6f3bb0", clean: "#146b3a", info: "#1d5fb4" },
  },
};

export const DEFAULT_THEME = "dark";

/**
 * The schemes in menu order, with the labels the Color Scheme menus show.
 * `icon` is only used by the in-app toolbar picker; the native macOS menu shows `label`.
 */
export const THEME_OPTIONS = [
  { id: "dark", label: "Dark Mode", icon: "🌙", description: "Charcoal with the orange accent (default)" },
  { id: "light", label: "Light Mode", icon: "☀️", description: "White with the orange accent" },
  { id: "spring", label: "Spring", icon: "🌱", description: "Fresh leaf greens on a pale background" },
  { id: "summer", label: "Summer", icon: "🌊", description: "Deep ocean blues with bright surf" },
  { id: "autumn", label: "Autumn", icon: "🍂", description: "Pumpkin orange and harvest gold on dark brown" },
  { id: "winter", label: "Winter", icon: "🎄", description: "Snow white with Christmas red and pine green" },
];

export const THEME_IDS = THEME_OPTIONS.map((option) => option.id);

/** True for the id of a known color scheme (and nothing else — `toString` is not a scheme). */
export function isThemeName(name) {
  return typeof name === "string" && Object.prototype.hasOwnProperty.call(THEMES, name);
}

/** The theme object for `name`, or the default scheme when `name` is unknown or stale. */
export function resolveTheme(name) {
  return THEMES[isThemeName(name) ? name : DEFAULT_THEME];
}

/** Whether `name` resolves to a dark-based scheme. */
export function isDarkTheme(name) {
  return resolveTheme(name).base === "dark";
}
