// Modified by Yamato Security, 2026-11-04: redesigned the seasonal palettes, added Christmas,
// and defined onAccent/onPrimary foregrounds for readable filled controls. The `base` token
// and THEME_OPTIONS catalog drive the Color Scheme menus; electron/themes.js is the
// main-process mirror.

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
    text: "#e0ddd8", textDim: "#b0aaa4", textMuted: "#948e88", accent: "#E85D2A", accentHover: "#F47B50", onAccent: "#151311",
    rowOdd: "#141720", rowEven: "#0f1114", headerBg: "#181b20", headerText: "#E85D2A",
    selection: "rgba(232,93,42,0.14)", bookmark: "rgba(232,93,42,0.06)",
    modalBg: "#181b20", modalBorder: "#333639", overlay: "rgba(5,5,8,0.85)",
    success: "#4ade80", warning: "#F5A623", danger: "#f85149",
    btnBg: "#22252a", btnBorder: "#333639",
    // Unit 42 extended palette
    panelBg: "#0b0d10", cellBorder: "#12151a", accentSubtle: "rgba(232,93,42,0.12)",
    histBar: "#E85D2A", histBarHover: "#F47B50", histGrid: "#1e2028",
    primaryBtn: "#E85D2A", primaryBtnHover: "#F47B50", onPrimary: "#151311",
    toolbarBg: "rgba(24,27,32,0.82)", glassBg: "rgba(255,255,255,0.05)", glassBorder: "rgba(255,255,255,0.08)", glassHover: "rgba(255,255,255,0.10)",
    // Severity palette — used by SUS_COLORS, INT_COLOR, PI_SEV_COLORS, IOC verdicts.
    // Distinct from brand `accent` (which is #E85D2A): severity needs cooler reds, deeper amber, etc.
    sev: { critical: "#f85149", high: "#f0883e", med: "#d29922", low: "#8b949e", custom: "#a371f7", clean: "#3fb950", info: "#58a6ff" },
  },
  light: {
    base: "light",
    bg: "#ffffff", bgAlt: "#f7f5f3", bgInput: "#ffffff", border: "#e0dbd6", borderAccent: "#B84317",
    text: "#1c1917", textDim: "#554f4a", textMuted: "#6f6862", accent: "#B84317", accentHover: "#963512", onAccent: "#ffffff",
    rowOdd: "#faf8f6", rowEven: "#ffffff", headerBg: "#f7f5f3", headerText: "#B84317",
    selection: "rgba(232,93,42,0.10)", bookmark: "rgba(232,93,42,0.06)",
    modalBg: "#ffffff", modalBorder: "#e0dbd6", overlay: "rgba(28,25,23,0.5)",
    success: "#15803d", warning: "#9A5B00", danger: "#dc2626",
    btnBg: "#f0ebe6", btnBorder: "#e0dbd6",
    // Unit 42 extended palette
    panelBg: "#f0ebe6", cellBorder: "#ebe6e0", accentSubtle: "rgba(232,93,42,0.08)",
    histBar: "#B84317", histBarHover: "#963512", histGrid: "#e0dbd6",
    primaryBtn: "#B84317", primaryBtnHover: "#963512", onPrimary: "#ffffff",
    toolbarBg: "rgba(247,245,243,0.82)", glassBg: "rgba(0,0,0,0.03)", glassBorder: "rgba(0,0,0,0.06)", glassHover: "rgba(0,0,0,0.08)",
    sev: { critical: "#dc2626", high: "#cc4400", med: "#92400e", low: "#554f4a", custom: "#6d28d9", clean: "#15803d", info: "#1d4ed8" },
  },
  // ── Seasonal schemes ─────────────────────────────────────────────────────────
  // Spring / 新緑 — sun through young leaves: layered greens, not blossom pink.
  spring: {
    base: "light",
    bg: "#f0f7e8", bgAlt: "#dfedcc", bgInput: "#fbfff6", border: "#b2c792", borderAccent: "#427a25",
    text: "#18351c", textDim: "#345536", textMuted: "#49633c", accent: "#2c641b", accentHover: "#214f14", onAccent: "#ffffff",
    rowOdd: "#e6f1d9", rowEven: "#f0f7e8", headerBg: "#c9e2a7", headerText: "#244d16",
    selection: "rgba(77,128,36,0.18)", bookmark: "rgba(150,177,45,0.15)",
    modalBg: "#f4faec", modalBorder: "#a3bd7f", overlay: "rgba(18,40,20,0.50)",
    success: "#286131", warning: "#835400", danger: "#b4342c",
    btnBg: "#e3efd2", btnBorder: "#a3bd7f",
    panelBg: "#d3e9b4", cellBorder: "#d2e3bf", accentSubtle: "rgba(66,122,37,0.12)",
    histBar: "#55902a", histBarHover: "#337319", histGrid: "#b4ce99",
    primaryBtn: "#366e20", primaryBtnHover: "#285619", onPrimary: "#ffffff",
    toolbarBg: "rgba(201,226,167,0.96)", glassBg: "rgba(255,255,255,0.28)", glassBorder: "rgba(48,90,26,0.18)", glassHover: "rgba(66,122,37,0.12)",
    sev: { critical: "#b3261e", high: "#a9430a", med: "#815500", low: "#506149", custom: "#71509b", clean: "#286131", info: "#235c88" },
  },
  // Summer — a sunlit beach: surf-blue tables, sand-yellow chrome, orange bookmarks
  // and near-black ink. A light scheme, with warm and cool colors in separate roles.
  summer: {
    base: "light",
    bg: "#f4fbff", bgAlt: "#e0f3ff", bgInput: "#ffffff", border: "#afcfdd", borderAccent: "#c75a12",
    text: "#101b24", textDim: "#304e5c", textMuted: "#48616a", accent: "#00699b", accentHover: "#00517d", onAccent: "#ffffff",
    rowOdd: "#eaf7ff", rowEven: "#ffffff", headerBg: "#ccecff", headerText: "#064964",
    selection: "rgba(0,105,155,0.14)", bookmark: "rgba(234,122,34,0.17)",
    modalBg: "#f8fcff", modalBorder: "#9bbdce", overlay: "rgba(8,36,54,0.48)",
    success: "#196b47", warning: "#936000", danger: "#c43a1c",
    btnBg: "#ffdf73", btnBorder: "#c39d2b",
    panelBg: "#fff0bd", cellBorder: "#d8eaf2", accentSubtle: "rgba(0,105,155,0.10)",
    histBar: "#007fba", histBarHover: "#005f98", histGrid: "#d7cc9e",
    primaryBtn: "#ffc947", primaryBtnHover: "#ffb737", onPrimary: "#171c20",
    toolbarBg: "rgba(255,226,139,0.97)", glassBg: "rgba(255,255,255,0.32)", glassBorder: "rgba(72,74,40,0.18)", glassHover: "rgba(210,112,18,0.12)",
    sev: { critical: "#c02b25", high: "#b94d0c", med: "#876000", low: "#48616a", custom: "#74519b", clean: "#196b47", info: "#00699b" },
  },
  // Autumn / 紅葉 — maple red and copper-orange against walnut and chestnut.
  // Keep the working surface dark, with red headers and brighter amber controls.
  autumn: {
    base: "dark",
    bg: "#281810", bgAlt: "#382218", bgInput: "#20120d", border: "#73482f", borderAccent: "#ee7547",
    text: "#fff1df", textDim: "#e8ceb5", textMuted: "#cfb496", accent: "#ffb45c", accentHover: "#ffc982", onAccent: "#23150c",
    rowOdd: "#302015", rowEven: "#281810", headerBg: "#5c251c", headerText: "#ffdb9c",
    selection: "rgba(255,154,94,0.19)", bookmark: "rgba(220,75,49,0.20)",
    modalBg: "#382218", modalBorder: "#855537", overlay: "rgba(15,8,5,0.83)",
    success: "#b7d386", warning: "#f2cf79", danger: "#ffa49a",
    btnBg: "#512d1d", btnBorder: "#855537",
    panelBg: "#431d16", cellBorder: "#442c1d", accentSubtle: "rgba(244,139,64,0.14)",
    histBar: "#f48b40", histBarHover: "#ffc16e", histGrid: "#72432d",
    primaryBtn: "#eaa14d", primaryBtnHover: "#ffb963", onPrimary: "#23150c",
    toolbarBg: "rgba(92,37,28,0.96)", glassBg: "rgba(255,198,123,0.06)", glassBorder: "rgba(255,198,123,0.18)", glassHover: "rgba(255,171,90,0.13)",
    sev: { critical: "#ff9186", high: "#ffb05e", med: "#f2cf79", low: "#cfb496", custom: "#e5b39a", clean: "#b7d386", info: "#b8d8d6" },
  },
  // Winter — blue ice, snow-white rows and pale glacier-blue controls. Christmas
  // has its own scheme below; red and green here are reserved for status meanings.
  winter: {
    base: "light",
    bg: "#f4fbff", bgAlt: "#e3f3fc", bgInput: "#ffffff", border: "#b1cedf", borderAccent: "#6baccd",
    text: "#183749", textDim: "#365568", textMuted: "#456478", accent: "#16678d", accentHover: "#0a5276", onAccent: "#ffffff",
    rowOdd: "#ecf7fd", rowEven: "#ffffff", headerBg: "#d0eafa", headerText: "#24536e",
    selection: "rgba(66,139,185,0.18)", bookmark: "rgba(120,187,227,0.18)",
    modalBg: "#f8fcff", modalBorder: "#a6c8dc", overlay: "rgba(19,46,66,0.43)",
    success: "#276f62", warning: "#856000", danger: "#b33445",
    btnBg: "#ebf8ff", btnBorder: "#a6c8dc",
    panelBg: "#dff2ff", cellBorder: "#d5e9f5", accentSubtle: "rgba(65,141,183,0.10)",
    histBar: "#418db7", histBarHover: "#22688c", histGrid: "#b6d6e9",
    primaryBtn: "#b8e5fa", primaryBtnHover: "#9ddaf5", onPrimary: "#163e52",
    toolbarBg: "rgba(218,239,252,0.96)", glassBg: "rgba(255,255,255,0.42)", glassBorder: "rgba(37,95,132,0.16)", glassHover: "rgba(77,153,199,0.12)",
    sev: { critical: "#b33445", high: "#ad4c17", med: "#856000", low: "#456478", custom: "#685895", clean: "#276f62", info: "#16678d" },
  },
  // Christmas — a rich red workspace with evergreen headers, gold controls and
  // snow-white text; near-black ink keeps the yellow buttons readable.
  christmas: {
    base: "dark",
    bg: "#680f23", bgAlt: "#7e1730", bgInput: "#510d1c", border: "#a94759", borderAccent: "#ffe083",
    text: "#fffdf3", textDim: "#ffe6dc", textMuted: "#f3cabf", accent: "#ffe083", accentHover: "#fff0b9", onAccent: "#1c1710",
    rowOdd: "#73172b", rowEven: "#680f23", headerBg: "#15593d", headerText: "#fff1b3",
    selection: "rgba(255,224,131,0.16)", bookmark: "rgba(141,219,154,0.16)",
    modalBg: "#73172b", modalBorder: "#bd6172", overlay: "rgba(20,6,10,0.82)",
    success: "#b2e59c", warning: "#ffdf76", danger: "#ffc0b8",
    btnBg: "#164f37", btnBorder: "#448d68",
    panelBg: "#520a1c", cellBorder: "#863247", accentSubtle: "rgba(255,224,131,0.12)",
    histBar: "#8cdb9a", histBarHover: "#b4efb8", histGrid: "#9c4154",
    primaryBtn: "#ffe083", primaryBtnHover: "#fff0b9", onPrimary: "#1c1710",
    toolbarBg: "rgba(116,18,43,0.97)", glassBg: "rgba(255,242,211,0.06)", glassBorder: "rgba(255,224,131,0.22)", glassHover: "rgba(255,224,131,0.12)",
    sev: { critical: "#ffc0b8", high: "#ffc280", med: "#ffe083", low: "#e4c7cc", custom: "#e2cafa", clean: "#b2e59c", info: "#b5e2ff" },
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
  { id: "spring", label: "Spring", icon: "🌱", description: "Sunlit new leaves — layered fresh greens" },
  { id: "summer", label: "Summer", icon: "🌊", description: "Beach blue, sunny yellow, warm orange and white" },
  { id: "autumn", label: "Autumn", icon: "🍂", description: "Maple red, copper orange and warm brown" },
  { id: "winter", label: "Winter", icon: "❄️", description: "Snow white and pale glacier blue" },
  { id: "christmas", label: "Christmas", icon: "🎄", description: "Festive red, evergreen, gold and snow white" },
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

/** Build once per histogram render; interpolate the theme's two density endpoints. */
export function createHistogramColorScale(theme) {
  const rgb = (hex) => hex.match(/[0-9a-f]{2}/gi).map((part) => parseInt(part, 16));
  const low = rgb(theme.histBar);
  const high = rgb(theme.histBarHover);
  return (ratio) => {
    const t = Math.max(0, Math.min(1, ratio));
    return `rgb(${low.map((channel, i) => Math.round(channel + (high[i] - channel) * t)).join(",")})`;
  };
}
