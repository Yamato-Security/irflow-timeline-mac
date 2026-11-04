/**
 * themes.js — Color-scheme catalog for the main process.
 *
 * Added by Yamato Security, 2026-11-04. The renderer owns the full token sets in
 * src/constants/themes.js; the main process only needs each scheme's id, menu label and
 * window background (painted before the renderer loads, so a light scheme does not flash
 * dark on launch). tests/color-schemes.test.js fails if the two files drift apart.
 */
const THEME_OPTIONS = Object.freeze([
  Object.freeze({ id: "dark", label: "Dark Mode", windowBackground: "#0f1114" }),
  Object.freeze({ id: "light", label: "Light Mode", windowBackground: "#ffffff" }),
  Object.freeze({ id: "spring", label: "Spring", windowBackground: "#f6fbf3" }),
  Object.freeze({ id: "summer", label: "Summer", windowBackground: "#06192b" }),
  Object.freeze({ id: "autumn", label: "Autumn", windowBackground: "#1a110b" }),
  Object.freeze({ id: "winter", label: "Winter", windowBackground: "#fbfdff" }),
]);

const DEFAULT_THEME = "dark";

function isThemeId(value) {
  return typeof value === "string" && THEME_OPTIONS.some((option) => option.id === value);
}

function windowBackgroundFor(themeId) {
  const option = THEME_OPTIONS.find((o) => o.id === themeId) || THEME_OPTIONS.find((o) => o.id === DEFAULT_THEME);
  return option.windowBackground;
}

module.exports = { THEME_OPTIONS, DEFAULT_THEME, isThemeId, windowBackgroundFor };
