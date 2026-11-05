---
description: Configure date/time display format, timezone, font size, color scheme, and temp storage in IRFlow Timeline.
---

# Preferences

Display and storage preferences are split across the **in-app toolbar** (inside the window) and the **macOS application menu** (system menu bar when IRFlow Timeline is focused). Both paths change the same settings.

## In-app toolbar

The settings capsule to the right of **File / View / Actions / Tools / Help** provides the fastest day-to-day controls:

| Control | What it does |
|---------|----------------|
| **Datetime format** dropdown | How timestamp columns render in the grid (raw or formatted) |
| **Timezone** dropdown | Display timezone for timestamps (data in SQLite stays unchanged) |
| **Color scheme** dropdown | Switch between **Dark Mode**, **Light Mode**, **Spring**, **Sakura**, **Summer**, **Autumn**, **Winter** and **Christmas** |
| **A − / +** | Decrease or increase grid font size (9–18px) |
| **Histogram** icon | Show or hide the timeline histogram panel |

These mirror the options under the macOS **Tools** menu described below.

## macOS application menu (Tools)

The native **Tools** menu (top of the screen on macOS) includes additional items:

### Datetime Format

Control how timestamp columns are displayed in the grid. The underlying data is unchanged — formatting is applied at render time.

**Tools → Datetime Format**, or use the toolbar dropdown:

| Format | Example |
|--------|---------|
| **Default (raw)** | Displays the original value as-is |
| `yyyy-MM-dd HH:mm:ss` | `2025-03-15 14:30:45` |
| `yyyy-MM-dd HH:mm:ss.fff` | `2025-03-15 14:30:45.123` |
| `yyyy-MM-dd HH:mm:ss.fffffff` | `2025-03-15 14:30:45.1234567` |
| `MM/dd/yyyy HH:mm:ss` | `03/15/2025 14:30:45` |
| `dd/MM/yyyy HH:mm:ss` | `15/03/2025 14:30:45` |
| `yyyy-MM-dd` | `2025-03-15` |

::: tip Sub-Second Precision
Use `yyyy-MM-dd HH:mm:ss.fffffff` for Sysmon and EVTX data where sub-second precision is forensically relevant — especially when correlating process creation with network connections.
:::

### Timezone

Convert timestamp display to a specific timezone. **Tools → Timezone**, or use the toolbar dropdown.

| Timezone | IANA Identifier |
|----------|----------------|
| **UTC** | `UTC` |
| **US/Eastern** (EST/EDT) | `America/New_York` |
| **US/Central** (CST/CDT) | `America/Chicago` |
| **US/Mountain** (MST/MDT) | `America/Denver` |
| **US/Pacific** (PST/PDT) | `America/Los_Angeles` |
| **Europe/London** (GMT/BST) | `Europe/London` |
| **Europe/Berlin** (CET/CEST) | `Europe/Berlin` |
| **Asia/Tokyo** (JST) | `Asia/Tokyo` |
| **Asia/Shanghai** (CST) | `Asia/Shanghai` |
| **Australia/Sydney** (AEST/AEDT) | `Australia/Sydney` |
| **Local (system)** | Uses your macOS system timezone |

Timezone conversion is display-only. The raw timestamp values in the database remain unchanged, and exports use the original values.

::: tip DFIR Best Practice
Work in UTC during analysis to maintain consistency with log sources and other analysts. Switch to the local timezone of the compromised host only when correlating user activity or system events with physical-world timelines.
:::

### Font Size

**Tools → Font Size**, or the toolbar **− / +** buttons:

- **Increase** — `Cmd+Plus` (macOS Tools menu)
- **Decrease** — `Cmd+-` (macOS Tools menu)
- Fixed sizes: 9px, 10px, 11px, 12px, 13px, 14px, 16px, 18px

Smaller sizes (9–10px) are useful for wide timelines with many columns. Larger sizes (14–18px) help when presenting findings or working on high-resolution displays.

### Color Scheme

- **Toolbar:** the color-scheme dropdown next to the timezone selector
- **macOS menu:** **Tools → Color Scheme**, where the active scheme is checked

There is no `Cmd+T` theme shortcut.

| Scheme | Base | Look |
|--------|------|------|
| **Dark Mode** (default) | dark | Charcoal background with the Unit 42 orange accent (`#E85D2A`); optimized for long analysis sessions |
| **Light Mode** | light | Soft gray chrome, white rows, navy text, teal and blue controls, blue selections and amber bookmarks |
| **Spring** | light | Uplifting Spring: predominantly Light Forest Green and Blue Green backgrounds, with lavender, cranberry and pale-yellow accents |
| **Sakura** | light | Reference blossom pinks, cream and pale blue, with bright rose controls and dark plum lettering |
| **Summer** | light | Predominantly aqua blue and sunny yellow, with citrus-red bookmarks, leaf-green details, sand panels and near-black text |
| **Autumn** | dark | Reference Japanese autumn colors: momiji red, orange, yellow, leaf green, plum and brown |
| **Winter** | light | Icy blue panels, snow-white rows and pale glacier-blue controls |
| **Christmas** | dark | Reference Christmas reds, exact Grinch Green `#58D130` lettering and solid chart bars, Candy Cane White headers |

Shared theme colors apply across the grid, modals, histogram, analytics panels and scrollbars. Text and control contrast is checked by the color-scheme tests. Features that only distinguish dark from light (native form controls and the auto-color palettes) follow the scheme's *base*. User-defined row colors and artifact-specific charts can have their own palettes.

The choice is saved in `ui-prefs.json` in the app's data folder and restored on the next launch; the window is painted in the scheme's background before the interface loads.

### Seasonal colors and readability

The seasonal palettes extend to the timeline, histogram, menus, dialogs, bookmarks and selection highlights. Spring, Sakura, Summer and Winter use a **light** base; Autumn and Christmas use a **dark** base; Christmas is separate from the icy Winter scheme. Filled controls use a contrasting foreground. Christmas uses exact Grinch Green for themed lettering, including severity labels, with white headers and controls; label text still identifies each severity. User-defined conditional formatting and artifact-specific charts retain their own colors. Decorative colors do not change detection levels or evidence.

Light Mode uses neutral surfaces for long reading sessions, with separate colors for selections, bookmarks and controls. The color tests cover text contrast on Light Mode and seasonal panels, inputs and rows, selected/bookmarked rows, and the normal and hover colors of filled controls. The scheme is remembered across launches, including Light Mode and Christmas.

### Reference palettes

- **Spring:** [Uplifting Spring (SPA1006)](https://stitchpalettes.com/palette/uplifting-spring-spa1006/) publishes `#6F5497`, `#B2A5CD`, `#E2A6BE`, `#FAE3A0`, `#A6B784` and `#748C7C`. Light Forest Green and Blue Green dominate the backgrounds.
- **Sakura:** [Sakura Blossom palette](https://img.magnific.com/premium-vector/color-element-trendy-pallete-color-sakura-color-pallete-swatch-summer-shade-tone-with-hex-code_615232-1235.jpg): `#D4E0EE`, `#FFDBDB`, `#FFA7A6`, `#FFF4F3`, `#F25477` and `#EC275F`. Dark plum foregrounds keep the pale surfaces and rose controls readable.
- **Summer:** [Summer palette 6](https://avemateiu.com/wp-content/uploads/2019/06/summer-color-palette-6.png): `#F03613`, `#EDC02C`, `#27B46E`, `#A2EEEB` and `#F3E2B3`. Aqua and yellow are the main surfaces; citrus, green and sand are supporting accents. Deep blue remains on chart bars and provides readable contrast.
- **Autumn:** [Japanese fall palette](https://branding-lab.net/wp-content/uploads/2026/11/japanese-fall-color-palette.jpg): `#C93036`, `#F08300`, `#E9B626`, `#83A33C`, `#A34C66` and `#6B3C2C`, with cream foregrounds.
- **Christmas:** [Christmas hex-code reference](https://letmeorganiseyou.co.uk/wp-content/uploads/2025/12/Xmas-Colours-Hex-Codes-LMOU.png): Classic Red `#B11226`, Traditional Green `#0B6B3A`, Holly Berry `#8B0000`, Vintage Green `#2E5339`, Candy Cane Red `#D00000`, Champagne Gold `#E8D9B5`, Silver `#C0C0C0`, Grinch Green `#58D130`, Coca-Cola Red `#F40009` and Candy Cane White `#F8F8FF`.

Christmas deliberately preserves the reference's exact Grinch Green for text and chart bars. It is a decorative option: its text contrast is approximately **2.87:1 on Candy Cane Red** and **1.88:1 on Candy Cane White**, below WCAG AA. Primary controls use Holly Berry fills, giving the green foreground approximately **5.04:1** contrast. Choose Light Mode or another standard palette when higher text contrast is needed. The standard palettes retain their existing text-contrast checks.

Accent lettering and opaque control fills are separate theme tokens. This lets the reference palettes retain their colors without drawing a label or checkmark in the same color as its button background.


### Histogram

- **Toolbar:** histogram bar-chart icon
- **macOS menu:** **Tools → Toggle Histogram**

### VirusTotal API Key

**Tools → VirusTotal API Key…** opens IOC matching settings for your API key and rate limits. See [VirusTotal Integration](/features/virustotal).

## Temp storage folder

Large imports build a per-tab SQLite database plus column indexes and FTS5 on disk. By default that work uses the macOS system temp directory (often on your boot volume). For 10–50GB+ timelines, redirect temp storage to a folder on a volume with plenty of free space.

| Menu item | Description |
|-----------|-------------|
| **Temp Storage:** *(read-only label)* | Shows the current folder or “Default (system temp)” |
| **Set Temp Storage Folder…** | Pick a writable directory; applies to **the next import** onward |
| **Use Default Temp Folder** | Clears the custom path (enabled only when a custom folder is set) |

::: warning Applies on next import
Changing temp storage does not move databases for tabs already open. Close and re-import, or start new imports after changing the folder.
:::

IRFlow checks free space on the temp volume before import and refuses the job if there is not enough room for the database and indexes (roughly a few times the source file size). The error message suggests freeing space or choosing **Set Temp Storage Folder…**.

Power users can also set the `TLE_TEMP_DIR` environment variable before launch; the menu setting takes precedence when both are set.

See [Performance Tips — Temp storage](/reference/performance-tips#temp-storage-folder) for sizing guidance.

## See Also

- [Keyboard Shortcuts](/reference/keyboard-shortcuts) — accelerators that overlap with these settings
- [Performance Tips](/reference/performance-tips) — disk space, temp storage, and large-file guidance
- [Virtual Grid](/features/virtual-grid) — toolbar and menu bar overview
