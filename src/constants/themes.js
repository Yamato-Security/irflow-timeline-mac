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
 * Standard palette text-contrast guarantees, enforced by tests/color-schemes.test.js (WCAG 2.x ratios):
 *   text, textDim and textMuted / bg ≥ 4.5, headerText / headerBg ≥ 4.5,
 *   accent, success, warning, danger and every severity color / bg ≥ 3.
 * The exact Christmas reference palette is decorative and does not meet these
 * text contrast targets. Opaque action fills are still checked for readable text.
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
    // A neutral workspace: soft gray chrome, white paper, navy ink and restrained
    // teal/blue controls. Amber bookmarks stay distinct from blue selections.
    bg: "#f5f7fa", bgAlt: "#edf2f7", bgInput: "#ffffff", border: "#c4cfdc", borderAccent: "#2563a6",
    text: "#172536", textDim: "#34465b", textMuted: "#506176", accent: "#0b6274", accentHover: "#084b5c", onAccent: "#ffffff",
    rowOdd: "#f4f7fb", rowEven: "#ffffff", headerBg: "#e2eaf3", headerText: "#233e5b",
    selection: "rgba(37,99,166,0.14)", bookmark: "rgba(210,144,24,0.13)",
    modalBg: "#ffffff", modalBorder: "#b7c5d5", overlay: "rgba(19,35,54,0.42)",
    success: "#187345", warning: "#925800", danger: "#c12c3e",
    btnBg: "#f8fafc", btnBorder: "#aebed0",
    panelBg: "#eaf0f6", cellBorder: "#e1e7ef", accentSubtle: "rgba(11,98,116,0.08)",
    histBar: "#337f9a", histBarHover: "#175c7a", histGrid: "#c4d0de",
    primaryBtn: "#2563a6", primaryBtnHover: "#1c4e86", onPrimary: "#ffffff",
    toolbarBg: "rgba(237,242,247,0.97)", glassBg: "rgba(255,255,255,0.55)", glassBorder: "rgba(48,74,105,0.16)", glassHover: "rgba(37,99,166,0.08)",
    sev: { critical: "#bd2035", high: "#b04b0a", med: "#895900", low: "#506176", custom: "#7045a2", clean: "#187345", info: "#2563a6" },
  },
  // ── Seasonal schemes ─────────────────────────────────────────────────────────
  // Spring reference: https://stitchpalettes.com/palette/uplifting-spring-spa1006/
  // Light Forest Green and Blue Green dominate; the floral colors are accents.
  spring: {
    base: "light",
    bg: "#a6b784", bgAlt: "#748c7c", bgInput: "#fae3a0", border: "#748c7c", borderAccent: "#6f5497",
    text: "#0b170f", textDim: "#112016", textMuted: "#142017", accent: "#21172d", accentHover: "#17101f", onAccent: "#fae3a0",
    rowOdd: "#a6b784", rowEven: "#a6b784", headerBg: "#a6b784", headerText: "#102015",
    selection: "rgba(178,165,205,0.22)", bookmark: "rgba(226,166,190,0.20)",
    modalBg: "#a6b784", modalBorder: "#6f5497", overlay: "rgba(36,51,41,0.55)",
    success: "#27462e", warning: "#604c0f", danger: "#732f4b",
    btnBg: "#b2a5cd", btnBorder: "#6f5497",
    panelBg: "#a6b784", cellBorder: "#748c7c", accentSubtle: "rgba(111,84,151,0.10)",
    histBar: "#6f5497", histBarHover: "#6f5497", histGrid: "#748c7c",
    primaryBtn: "#6f5497", primaryBtnHover: "#6f5497", onPrimary: "#fae3a0",
    fillAccent: "#6f5497", fillAccentHover: "#6f5497", fillWarning: "#6f5497", fillDanger: "#6f5497",
    toolbarBg: "rgba(116,140,124,0.98)", glassBg: "rgba(166,183,132,0.30)", glassBorder: "rgba(111,84,151,0.30)", glassHover: "rgba(250,227,160,0.10)",
    sev: { critical: "#732f4b", high: "#7e3e19", med: "#604c0f", low: "#142017", custom: "#614786", clean: "#27462e", info: "#24475c" },
  },
  // Sakura reference: https://img.magnific.com/premium-vector/color-element-trendy-pallete-color-sakura-color-pallete-swatch-summer-shade-tone-with-hex-code_615232-1235.jpg
  // Exact reference surfaces and accents, with plum foregrounds for readability.
  sakura: {
    base: "light",
    bg: "#fff4f3", bgAlt: "#ffdbdb", bgInput: "#fff4f3", border: "#d4e0ee", borderAccent: "#ec275f",
    text: "#432336", textDim: "#563647", textMuted: "#634153", accent: "#84264d", accentHover: "#70203f", onAccent: "#100810",
    rowOdd: "#ffdbdb", rowEven: "#fff4f3", headerBg: "#ffa7a6", headerText: "#432336",
    selection: "rgba(212,224,238,0.72)", bookmark: "rgba(255,167,166,0.28)",
    modalBg: "#fff4f3", modalBorder: "#f25477", overlay: "rgba(58,22,43,0.45)",
    success: "#286b4c", warning: "#8c5900", danger: "#ac294d",
    btnBg: "#ffdbdb", btnBorder: "#f25477",
    panelBg: "#fff4f3", cellBorder: "#d4e0ee", accentSubtle: "rgba(236,39,95,0.10)",
    histBar: "#f25477", histBarHover: "#ec275f", histGrid: "#d4e0ee",
    primaryBtn: "#ec275f", primaryBtnHover: "#f25477", onPrimary: "#100810",
    fillAccent: "#ec275f", fillAccentHover: "#f25477", fillWarning: "#ffa7a6", fillDanger: "#f25477",
    toolbarBg: "rgba(255,219,219,0.98)", glassBg: "rgba(255,244,243,0.30)", glassBorder: "rgba(236,39,95,0.18)", glassHover: "rgba(236,39,95,0.08)",
    sev: { critical: "#b32445", high: "#ab4c16", med: "#856000", low: "#634153", custom: "#81509b", clean: "#286b4c", info: "#37628c" },
  },
  // Summer reference: https://avemateiu.com/wp-content/uploads/2019/06/summer-color-palette-6.png
  // Aqua and sunny yellow dominate; citrus red, leaf green and sand are accents.
  summer: {
    base: "light",
    bg: "#a2eeeb", bgAlt: "#a2eeeb", bgInput: "#f3e2b3", border: "#6ebebd", borderAccent: "#f03613",
    text: "#101b24", textDim: "#304e5c", textMuted: "#3b535b", accent: "#005166", accentHover: "#004355", onAccent: "#0a1017",
    rowOdd: "#a2eeeb", rowEven: "#d1f6f4", headerBg: "#edc02c", headerText: "#23474d",
    selection: "rgba(39,180,110,0.16)", bookmark: "rgba(240,54,19,0.16)",
    modalBg: "#f3e2b3", modalBorder: "#6ebebd", overlay: "rgba(8,36,54,0.48)",
    success: "#196b47", warning: "#795000", danger: "#bb2a12",
    btnBg: "#edc02c", btnBorder: "#27b46e",
    panelBg: "#f3e2b3", cellBorder: "#8bd4d1", accentSubtle: "rgba(0,93,116,0.10)",
    histBar: "#007fba", histBarHover: "#005f98", histGrid: "#d5c593",
    primaryBtn: "#edc02c", primaryBtnHover: "#f3e2b3", onPrimary: "#0a1017",
    fillAccent: "#edc02c", fillAccentHover: "#f3e2b3", fillWarning: "#edc02c", fillDanger: "#f03613",
    toolbarBg: "rgba(237,192,44,0.98)", glassBg: "rgba(243,226,179,0.30)", glassBorder: "rgba(0,93,116,0.20)", glassHover: "rgba(240,54,19,0.10)",
    sev: { critical: "#bb2a12", high: "#ad420c", med: "#795000", low: "#3b535b", custom: "#74519b", clean: "#196b47", info: "#005d74" },
  },
  // Autumn reference: https://branding-lab.net/wp-content/uploads/2026/11/japanese-fall-color-palette.jpg
  // Momiji red, orange, yellow, leaf green, plum and brown, with cream text.
  autumn: {
    base: "dark",
    bg: "#6b3c2c", bgAlt: "#6b3c2c", bgInput: "#4b2a1f", border: "#a34c66", borderAccent: "#e9b626",
    text: "#fff8ed", textDim: "#fff1d8", textMuted: "#ffedd0", accent: "#fff4de", accentHover: "#fff8ed", onAccent: "#21120b",
    rowOdd: "#6b3c2c", rowEven: "#6b3c2c", headerBg: "#c93036", headerText: "#fff8ed",
    selection: "rgba(240,131,0,0.12)", bookmark: "rgba(131,163,60,0.13)",
    modalBg: "#6b3c2c", modalBorder: "#f08300", overlay: "rgba(15,8,5,0.83)",
    success: "#83a33c", warning: "#e9b626", danger: "#ffb2a6",
    btnBg: "#a34c66", btnBorder: "#e9b626",
    panelBg: "#3b2018", cellBorder: "#a34c66", accentSubtle: "rgba(240,131,0,0.12)",
    histBar: "#c93036", histBarHover: "#f08300", histGrid: "#6b3c2c",
    primaryBtn: "#f08300", primaryBtnHover: "#e9b626", onPrimary: "#21120b",
    fillAccent: "#f08300", fillAccentHover: "#e9b626", fillWarning: "#e9b626", fillDanger: "#f08300",
    toolbarBg: "rgba(201,48,54,0.98)", glassBg: "rgba(233,182,38,0.06)", glassBorder: "rgba(233,182,38,0.25)", glassHover: "rgba(240,131,0,0.12)",
    sev: { critical: "#ffb2a6", high: "#f08300", med: "#e9b626", low: "#ffedd0", custom: "#f1d7e0", clean: "#83a33c", info: "#d4e0ee" },
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
  // Christmas reference: https://letmeorganiseyou.co.uk/wp-content/uploads/2025/12/Xmas-Colours-Hex-Codes-LMOU.png
  // Exact Grinch Green lettering and solid chart bars. This requested decorative
  // palette has low text contrast on bright red and white; do not claim WCAG AA.
  christmas: {
    base: "dark",
    bg: "#d00000", bgAlt: "#b11226", bgInput: "#f8f8ff", border: "#c0c0c0", borderAccent: "#e8d9b5",
    text: "#58d130", textDim: "#58d130", textMuted: "#58d130", accent: "#58d130", accentHover: "#58d130", onAccent: "#58d130",
    rowOdd: "#b11226", rowEven: "#d00000", headerBg: "#f8f8ff", headerText: "#58d130",
    selection: "rgba(139,0,0,0.55)", bookmark: "rgba(46,83,57,0.35)",
    modalBg: "#8b0000", modalBorder: "#e8d9b5", overlay: "rgba(46,83,57,0.65)",
    success: "#58d130", warning: "#58d130", danger: "#58d130",
    btnBg: "#f8f8ff", btnBorder: "#0b6b3a",
    panelBg: "#8b0000", cellBorder: "#8b0000", accentSubtle: "rgba(88,209,48,0.10)",
    histBar: "#58d130", histBarHover: "#58d130", histGrid: "#b11226",
    primaryBtn: "#8b0000", primaryBtnHover: "#8b0000", onPrimary: "#58d130",
    fillAccent: "#8b0000", fillAccentHover: "#8b0000", fillWarning: "#8b0000", fillDanger: "#8b0000",
    toolbarBg: "rgba(244,0,9,1)", glassBg: "rgba(139,0,0,0.14)", glassBorder: "rgba(232,217,181,0.35)", glassHover: "rgba(139,0,0,0.20)",
    sev: { critical: "#58d130", high: "#58d130", med: "#58d130", low: "#58d130", custom: "#58d130", clean: "#58d130", info: "#58d130" },
  },
};

// Separate foreground accents from opaque control fills. Existing palettes keep
// their original fills; reference palettes may need a different button background.
for (const th of Object.values(THEMES)) {
  th.fillAccent ??= th.accent;
  th.fillAccentHover ??= th.accentHover;
  th.fillWarning ??= th.warning;
  th.fillDanger ??= th.danger;
}

export const DEFAULT_THEME = "dark";

/**
 * The schemes in menu order, with the labels the Color Scheme menus show.
 * `icon` is only used by the in-app toolbar picker; the native macOS menu shows `label`.
 */
export const THEME_OPTIONS = [
  { id: "dark", label: "Dark Mode", icon: "🌙", description: "Charcoal with the orange accent (default)" },
  { id: "light", label: "Light Mode", icon: "☀️", description: "Soft gray and white, navy text, teal and blue accents" },
  { id: "spring", label: "Spring", icon: "🌱", description: "Uplifting Spring: light forest green, blue green and floral accents" },
  { id: "sakura", label: "Sakura", icon: "🌸", description: "Reference Sakura pinks, cream, pale blue and plum text" },
  { id: "summer", label: "Summer", icon: "🌊", description: "Aqua blue and sunny yellow with citrus, leaf green and sand accents" },
  { id: "autumn", label: "Autumn", icon: "🍂", description: "Japanese autumn: momiji red, orange, yellow, green, plum and brown" },
  { id: "winter", label: "Winter", icon: "❄️", description: "Snow white and pale glacier blue" },
  { id: "christmas", label: "Christmas", icon: "🎄", description: "Christmas reds, exact Grinch Green lettering and white headers" },
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
