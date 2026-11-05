import { TIMELINE_PALETTE, TIMELINE_PALETTE_LIGHT } from "../constants/timeline-palette.js";

// Pre-compile color rules for fast per-row matching (avoids repeated toLowerCase + regex construction)
export function compileColorRules(rules) {
  return rules.map((r) => {
    const v = r.value.toLowerCase();
    let test;
    if (r.condition === "contains") test = (cv) => cv.includes(v);
    else if (r.condition === "equals") test = (cv) => cv === v;
    else if (r.condition === "startswith") test = (cv) => cv.startsWith(v);
    else if (r.condition === "regex") {
      try { const re = new RegExp(r.value, "i"); test = (_cv, raw) => re.test(raw); }
      catch { test = () => false; }
    } else test = () => false;
    return { column: r.column, test, bg: r.bgColor, fg: r.fgColor };
  });
}

export function applyColors(row, compiledRules) {
  for (const r of compiledRules) {
    const raw = row[r.column] || "";
    if (r.test(raw.toLowerCase(), raw)) return { bg: r.bg, fg: r.fg };
  }
  return null;
}

const MAX_TIMELINE_COLOR_RULES = 150;

export function buildTimelineColorRules(rows, colName, isDark) {
  const palette = isDark ? TIMELINE_PALETTE : TIMELINE_PALETTE_LIGHT;
  const seen = new Map();
  for (const row of rows) {
    const val = (row[colName] || "").trim();
    if (val && !seen.has(val)) {
      seen.set(val, seen.size);
      if (seen.size >= MAX_TIMELINE_COLOR_RULES) break;
    }
  }
  return Array.from(seen.entries()).map(([val, idx]) => {
    const p = palette[idx % palette.length];
    return { column: colName, condition: "equals", value: val, bgColor: p.bg, fgColor: p.fg };
  });
}

// Added by Yamato Security, 2026-11-06: row colors by rule level, in Hayabusa's colors.
function mixHex(a, b, weightOfA) {
  const parse = (h) => {
    const x = String(h).replace("#", "");
    const full = x.length === 3 ? x.split("").map((c) => c + c).join("") : x.slice(0, 6);
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) || 0);
  };
  const ca = parse(a);
  const cb = parse(b);
  return "#" + ca.map((v, i) => Math.round(v * weightOfA + cb[i] * (1 - weightOfA)).toString(16).padStart(2, "0")).join("");
}

/**
 * Colors for a row whose level has `levelColor`. Hayabusa colors the text of a level on a dark
 * terminal: dark themes do the same over a tint of the color; light themes, where yellow or
 * green text would not be readable, use a pale tint of the color behind the theme's text.
 */
export function levelRowColors(levelColor, th) {
  const dark = th?.base === "dark";
  const bg = th?.bg || (dark ? "#0f1114" : "#ffffff");
  return dark
    ? { bgColor: mixHex(levelColor, bg, 0.18), fgColor: levelColor }
    : { bgColor: mixHex(levelColor, bg, 0.35), fgColor: th?.text || "#172536" };
}

/**
 * Color rules for a level column: one per level value ("crit" and "critical", ...), none for
 * levels without a color (informational). Each rule keeps its `levelColor`, so it can be
 * recolored for another theme (recolorLevelRules).
 * @param {string} column
 * @param {{ values: string[], color: string }[]} levels
 */
export function buildLevelColorRules(column, levels, th) {
  const rules = [];
  for (const level of levels) {
    for (const value of level.values) {
      rules.push({ column, condition: "equals", value, ...levelRowColors(level.color, th), levelColor: level.color });
    }
  }
  return rules;
}

/** The same rules with their level colors redone for theme `th`; other rules unchanged. */
export function recolorLevelRules(rules, th) {
  if (!Array.isArray(rules) || !rules.some((r) => r?.levelColor)) return rules;
  return rules.map((r) => (r?.levelColor ? { ...r, ...levelRowColors(r.levelColor, th) } : r));
}
