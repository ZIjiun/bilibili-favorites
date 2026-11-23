---
name: 收藏島
description: A personal Bilibili favorites catalog drawn as a game stage-select island, one landmark per topic group.
colors:
  accent: "#e4572e"
  accent-ink: "#b8401d"
  accent-beige: "#c8502c"
  accent-dark: "#ff8a5c"
  page: "#eef3f6"
  page-beige: "#f3ead8"
  page-dark: "#0e141c"
  surface-1: "#e1e9ee"
  surface-2: "#d3dde4"
  card: "#ffffff"
  ink: "#1b2735"
  ink-muted: "#526273"
  ink-beige: "#33281d"
  ink-dark: "#e8edf3"
  hairline: "#cad6df"
  search-mark: "#ffe08a"
  sea: "#6cc3dd"
  sea-crest: "#a6e0ef"
  sea-beige: "#7cb8aa"
  sea-night: "#0f2238"
  sand: "#f2e0a9"
  grass: "#9fd27d"
  leaf: "#5fae55"
  rock: "#a79cab"
  rock-shade: "#857a8d"
  outline: "#2a2340"
  info-bar: "#24324f"
  info-bar-ink: "#ffffff"
  pedestal-earth: "#6b4a36"
  trunk: "#8a5a3a"
typography:
  headline:
    fontFamily: "\"PingFang TC\", \"Noto Sans TC\", \"Microsoft JhengHei UI\", \"Microsoft JhengHei\", system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "0.04em"
  brand:
    fontFamily: "\"PingFang TC\", \"Noto Sans TC\", \"Microsoft JhengHei UI\", system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 800
    letterSpacing: "0.08em"
  title:
    fontFamily: "\"PingFang TC\", \"Noto Sans TC\", \"Microsoft JhengHei UI\", system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 700
    lineHeight: 1.45
  body:
    fontFamily: "\"PingFang TC\", \"Noto Sans TC\", \"Microsoft JhengHei UI\", \"Microsoft JhengHei\", system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  meta:
    fontFamily: "\"PingFang TC\", \"Noto Sans TC\", \"Microsoft JhengHei UI\", system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
  label:
    fontFamily: "\"PingFang TC\", \"Noto Sans TC\", \"Microsoft JhengHei UI\", system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    letterSpacing: "0.1em"
  map-badge:
    fontFamily: "\"PingFang TC\", \"Noto Sans TC\", \"Microsoft JhengHei UI\", system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 900
    letterSpacing: "0.2em"
  keycap:
    fontFamily: "ui-monospace, Menlo, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1
rounded:
  xs: "5px"
  sm: "6px"
  md: "10px"
  lg: "12px"
  map: "18px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "22px"
  gutter: "24px"
  grid-row: "28px"
  column: "1360px"
components:
  search-field:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    height: "44px"
    padding: "0 6px 0 14px"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "6px 14px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-1}"
  theme-segment:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.md}"
    padding: "5px 11px"
  theme-segment-active:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
  chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "5px 13px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page}"
  folder-tag:
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.sm}"
    padding: "2px 9px"
  video-thumb:
    backgroundColor: "{colors.surface-2}"
    rounded: "{rounded.lg}"
  map-frame:
    backgroundColor: "{colors.sea}"
    rounded: "{rounded.map}"
  info-bar:
    backgroundColor: "{colors.info-bar}"
    textColor: "{colors.info-bar-ink}"
    rounded: "{rounded.pill}"
    width: "150px"
  info-bar-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.info-bar-ink}"
---

# Design System: 收藏島

## Overview

**Creative North Star: "The Stage-Select Island"**

The catalog is a game world map. One continuous organic island sits on a sea; each topic group is a region with its own ground material, one big outlined cartoon landmark on a round earthen pedestal, an icon-plus-name badge and a pill info bar carrying its true video count. Picking a topic is picking a stage. Around the map, the product shell is deliberately plain: a clean system-sans bar, quiet hairline controls and a thumbnail wall, so the illustration is the only loud thing on screen and the thumbnails are the content.

The illustration speaks one dialect: flat fills, a single dark outline colour at a consistent stroke (2 to 2.5 map units, round joins), one lighter highlight and one darker side-shade per volume, soft black ellipse shadows on the ground. Everything on the island is drawn in SVG code, generated from the folder data, and regenerates daily; new groups get a default landmark (a tent with a flag) and a slot in the next row, so the world tolerates change without hand placement.

The world shifts with the time of day, not with a different palette system: light is a day sea, beige a warm afternoon with a teal-green sea and brown outlines, dark a night sea where ground materials drop to 55% brightness, windows glow amber, landmarks get a blurred halo and a moon with its reflection appears. The rejected looks, confirmed by the owner, are the nautical sea chart this world replaced and an isometric tile board.

**Key Characteristics:**
- One island, one landmark per group, three staggered rows (4/5/4) on desktop, three columns on phone.
- Map regions are working controls with true counts; folders stay off the map and appear as chips.
- Outlined cartoon illustration inside, quiet product chrome outside.
- Four themes (auto, light, beige, dark) retint both the chrome and the whole world.
- Ambient motion is slow and small, and every loop stops under reduced motion.

## Colors

Two palettes share one set of variables: a muted cool-neutral product chrome with one warm orange accent, and a saturated toy-like world palette for the island.

### Primary
- **Ember Orange** (accent): the single action colour. Focus rings, the search focus glow, the selected region's ring and info bar, region info bars that contain search hits, text selection, the underline on hovered titles and the folder tag's tinted fill. Beige deepens it to Terracotta (accent-beige); dark lifts it to Coral (accent-dark).
- **Burnt Ember** (accent-ink): the text-safe version of the accent, used for the folder tag label.

### Secondary: the world
- **Day Sea / Sea Crest** (sea, sea-crest): the open water and the drifting wave strokes; the shallows ring uses its own lighter step. Beige swaps to a jade sea, dark to Night Sea.
- **Beach Sand, Meadow, Leaf** (sand, grass, leaf): the island's three concentric bands (shallows, beach rim, grass) and every tree clump.
- **Ridge Stone** (rock, rock-shade): the mountain ridge across the back, lit face plus shaded face, snowcaps on the tallest peaks.
- **Ink Outline** (outline): the one outline colour for every drawn object. Beige warms it to brown, dark drops it near black.
- **Info Bar Navy** (info-bar, info-bar-ink): the pill under each badge, at 90% opacity.
- **Pedestal Earth** (pedestal-earth): the side wall of every landmark pedestal.

### Region colours
Each group owns a pair, an icon colour and a light ground colour, defined in the art module (`ART.COL`), plus a ground material (`ART.T`): fill, darker edge and a scatter of marks. AI is crystal cyan with shards; 程式 slate blue with circuit traces; 命理 violet with tiny stars; 遊戲 basalt brown with glowing lava cracks; 開源 wheat gold with grass tufts; 學習 honey with a path of stepping stones; 職場 paving grey with diagonal joints; 心理 sky blue with ripples; 生活 butter yellow with pebbles; 感情 blossom pink with petals; 娛樂 coral with confetti; 放鬆 pale sand with shells; 萌寵 deep meadow with grass blades. The same icon colour colours the chip swatch and the placeholder gradient of a card whose cover fails to load, so a region reads the same everywhere.

### Neutral
- **Mist Page** (page): page background; beige uses Parchment, dark uses Night Slate.
- **Mist Surface** (surface-1, surface-2): hover fills, the theme switch track, the empty thumbnail.
- **White Card** (card): inputs, buttons, unselected chips.
- **Harbor Ink / Slate Muted** (ink, ink-muted): text and secondary text, counts, placeholders.
- **Hairline** (hairline): every 1px border and the bar's bottom rule.
- **Highlighter** (search-mark): search term highlight inside titles, creators and intros.

### Named Rules
**The One Ember Rule.** The accent marks selection, focus and search hits, and nothing else. The chrome never gets a second accent; colour variety lives on the island.

**The Region Owns Its Colour Rule.** A group's icon colour is fixed and travels with it: landmark ground, badge disc, chip swatch, card placeholder. Never recolour a region per screen.

**The Time Of Day Rule.** A theme changes the light on the world, not the world: same layout, same landmarks, same region pairs; only sea, outline, ground brightness and night details move.

## Typography

**Display Font:** none; the system Traditional Chinese sans (PingFang TC, Noto Sans TC, Microsoft JhengHei) carries everything.
**Body Font:** the same stack, falling back to system-ui.
**Label/Mono Font:** ui-monospace, only for the `/` keycap.

**Character:** One sturdy CJK sans, weight doing the work. Heavy weights (800 to 900) sit on the brand, the page heading and the map badges; the rest is regular text at comfortable sizes.

### Hierarchy
- **Headline** (800, 24px, 1.25, +0.04em): the single page heading above the map; 19px on phone.
- **Brand** (800, 19px, +0.08em): the wordmark beside the cube mark; 17px on phone.
- **Map badge** (900, 19 map units on desktop and 27 on the portrait map, +0.2em): white region names with a 5px dark outline stroke painted under the fill, so they read on any ground.
- **Title** (700, 15.5px, 1.45): video titles, two-line clamp; 14.5px on phone.
- **Body** (400, 15px, 1.55): base text; the search input runs at 16px so phones do not zoom.
- **Meta** (400, 13.5px): creator and date line, one-line intro snippet; 13px on phone.
- **Label** (700, 13px, +0.1em): the row labels 總分類 and 收藏夾 in front of the chip rows.

### Named Rules
**The Tabular Counts Rule.** Every count (chip numbers, info bar totals, durations) uses tabular figures so numbers do not jitter as search narrows them.

## Layout

One centred column, 1360px max, 24px gutters (14px under 900px). The sticky top bar is a three-column grid: brand (200px), search (up to 620px), theme switch pushed right; under 900px it becomes brand plus theme on the first line and full-width search on the second, and the keycap hides.

Below the bar, in order: heading row with the collapse-map button, the map at full column width, the chip rows, a result line with sort, then the thumbnail wall. The wall is an auto-fill grid of cards at least 250px wide with 28px row and 18px column gaps; on phone it is always two columns (22px by 12px).

The map is an SVG with its own coordinate space: 1400 units wide on desktop with 13 landmarks in rows of 4/5/4 at 184-unit row spacing, alternating x positions so rows interlock; extra groups append further rows. Under 900px it redraws as a 720-unit portrait island in three columns with the middle column dropped 70 units. The island outline is a gooey union of circles around every landmark plus seeded coastal bumps, the river runs from the ridge down between columns to a sand mouth, and tree clumps fill only the ground no landmark, badge or river claims.

Chip rows wrap on desktop with their label hung in a 68px left margin; on phone they scroll sideways with a fade mask on the right edge.

## Elevation & Depth

The chrome is flat with two soft shadows; depth belongs to the island.

### Shadow Vocabulary
- **Map lift** (`box-shadow: 0 1px 2px rgba(20,30,50,.08), 0 12px 32px -12px rgba(20,40,70,.28)`): the map frame only, setting the world above the page.
- **Hairline lift** (`box-shadow: 0 1px 2px rgba(20,30,50,.06)`): the search field at rest.
- **Pressed segment** (`box-shadow: 0 1px 3px rgba(20,30,50,.14)`): the active theme button.
- **Ground shadow** (black ellipse at 12 to 16% opacity): under every pedestal and tree on the map.
- The top bar uses a 92% page-colour fill with a 10px blur instead of a shadow.

### Named Rules
**The Lift On Choose Rule.** On the map, hover, keyboard focus and selection raise a landmark 7 units off its pedestal and light an accent ring on the pedestal; the selected ring pulses. Nothing else on the island moves in response to the pointer.

## Shapes

The chrome is softly rounded: 10px buttons, 12px search field and thumbnails, 18px map frame (14px on phone), full pills for chips and info bars, 5 to 6px for small tags and the keycap. Borders are 1px hairlines; the keycap alone has a 2px bottom border.

The island is all curves: blobbed coast, catmull-rom river, irregular 14-point ground patches with a darker edge scaled 4% larger behind each fill, elliptical pedestals with an earthen wall. Landmarks are built from simple solids (rects, triangles, circles, arcs) at cartoon proportions, about 160 units tall, always outlined.

## Components

### Map region (signature)
A button-role group per topic: pedestal shadow, selection ring, earthen pedestal in the region's ground colour, then the landmark. Its accessible name gives the region, video count (or hit count while searching), folder count and selected state. Enter or Space selects; selecting scrolls to the chips. While a region is selected the others fade to 72%; while searching, regions without hits fade to 42% with grayscale and regions with hits keep full colour.

### Badge and info bar (signature)
Under each landmark: a disc in the region icon colour holding a white 24-unit SVG glyph, then the outlined region name. Below, a navy pill: left 收藏夾 N, right N 支; during search it reads 符合 on the left and hits / total on the right. The pill turns Ember Orange when its region is selected or holds hits.

### Landmarks
AI crystal tower with a gold orbit ring; 程式 workshop with a code window, chimney smoke and turning gears; 命理 domed moon temple; 遊戲 volcano with lava and a flame; 開源 open treasure chest under a light beam; 學習 clock tower with a stack of books; 職場 office towers with a blinking aerial light; 心理 lighthouse with sweeping beams; 生活 shop with a scalloped awning; 感情 heart hedge arch over a fountain; 娛樂 turning ferris wheel; 放鬆 palm, parasol and steaming hot spring; 萌寵 tree house with a hopping bird.

### Buttons
- **Shape:** gently rounded (10px), 1px hairline border, white card fill, 14px text, 6px by 14px padding.
- **Hover / Focus:** fill shifts to Mist Surface; focus shows a 2px accent outline offset 2px.
- **Theme switch:** a segmented control on a Mist Surface track; the active segment is a white card with bold ink and the pressed shadow.

### Chips
- **Style:** white pill, hairline border, 14.5px label with a muted tabular count. Group chips lead with a 10px rounded-square swatch in the region colour.
- **State:** hover darkens the border to muted ink; selected inverts to an ink fill with page-coloured bold text; a group with zero hits drops to 50% opacity. The folder row appears only when a group is open.

### Cards / Containers
- **Corner Style:** thumbnails 12px; the card itself has no frame.
- **Background:** 16:9 cover over a gradient in the region colours with the region glyph, so a missing cover still says where the video lives. Duration sits in a black 78% badge bottom right.
- **Shadow Strategy:** none; the thumbnail rises 2px on hover.
- **Content:** two-line bold title link, creator and saved date, an intro snippet with the matched term when searching, and a folder tag (accent-tinted fill, Burnt Ember text) that filters to that folder.

### Inputs / Fields
- **Style:** 44px search field, white card fill, hairline border, 12px radius, magnifier glyph, `/` keycap, clear button when text is present.
- **Focus:** border turns accent with a 3px accent glow at 22%.
- **Select:** sort menu in the same hairline and card fill, 9px radius.

### Navigation
The sticky blurred top bar is the only navigation. Map, group chips and folder chips are three views of the same filter state, kept in the URL hash.

## Do's and Don'ts

### Do:
- **Do** give every new group a place on the island: a landmark, a ground material and a region colour pair, in the same outlined style.
- **Do** draw world art in SVG code with the single outline colour, flat fills, one highlight and one shade per volume.
- **Do** keep counts true and tabular on the map, chips and result line.
- **Do** keep the chrome quiet: hairline borders, white cards, the system CJK sans, one accent.
- **Do** keep ambient motion slow (6 to 40 second loops for waves, clouds, wheel; 1 to 4 seconds for smoke, steam, beams, lava glow) and stop all of it under reduced motion.
- **Do** carry each theme into the world: sea, outline, ground brightness and night details change with it.

### Don't:
- **Don't** put folders on the map; they live in the chip row after a region is chosen.
- **Don't** return to a nautical sea chart or an isometric tile board.
- **Don't** copy the reference game's art; landmarks are original drawings.
- **Don't** use the accent as decoration; it means selected, focused or matched.
- **Don't** let the island push the thumbnails aside; the map collapses on request and the wall stays the content.
