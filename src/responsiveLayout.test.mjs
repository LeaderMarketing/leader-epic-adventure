import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const app = readFileSync(new URL("./App.jsx", import.meta.url), "utf8");
const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

assert.match(app, /menu-toggle/, "mobile hamburger button exists");
assert.match(app, /menu-open/, "header exposes an open state class");
assert.match(app, /aria-label="Toggle navigation menu"/, "hamburger has an accessible label");
assert.match(app, /useDragScroll/, "drag-to-scroll hook exists for swipeable rails");
assert.match(app, /draggable-rail/, "scroll rails expose a draggable class");
assert.match(app, /onPointerDown/, "scroll rails handle pointer drag start");

const contactPanelRule = css.match(/\.contact-panel\s*\{(?<body>[\s\S]*?)\n\}/)?.groups.body ?? "";
assert.doesNotMatch(contactPanelRule, /border:\s*1px solid var\(--line\)/, "contact panel removes boxed border");
assert.doesNotMatch(contactPanelRule, /background:/, "contact panel removes panel background");
assert.doesNotMatch(contactPanelRule, /box-shadow:/, "contact panel removes shadow");

assert.match(css, /@media \(max-width: 1040px\)[\s\S]*\.category-tabs\s*\{[\s\S]*overflow-x:\s*auto/, "category tabs scroll horizontally on mobile/tablet");
assert.match(css, /@media \(max-width: 1040px\)[\s\S]*\.entry-grid,\s*\.service-grid\s*\{[\s\S]*display:\s*flex[\s\S]*flex-wrap:\s*nowrap[\s\S]*overflow-x:\s*auto/, "entry cards scroll horizontally on mobile/tablet");
assert.match(css, /@media \(max-width: 1040px\)[\s\S]*\.entry-grid,\s*\.service-grid\s*\{[\s\S]*display:\s*flex[\s\S]*flex-wrap:\s*nowrap[\s\S]*overflow-x:\s*auto/, "service cards scroll horizontally on mobile/tablet");
assert.match(css, /\.draggable-rail\s*\{[\s\S]*scrollbar-width:\s*none/, "drag rails hide Firefox scrollbars");
assert.match(css, /\.draggable-rail::-webkit-scrollbar\s*\{[\s\S]*display:\s*none/, "drag rails hide WebKit scrollbars");
assert.match(css, /\.draggable-rail\.is-dragging\s*\{[\s\S]*cursor:\s*grabbing/, "drag rails show dragging affordance");

const phoneMedia = css.match(/@media \(max-width: 560px\)\s*\{(?<body>[\s\S]*)\n\}/)?.groups.body ?? "";
assert.match(phoneMedia, /h1\s*\{[\s\S]*max-width:\s*360px[\s\S]*font-size:\s*3\.5rem/, "phone hero title is constrained and smaller");
assert.match(phoneMedia, /\.hero-copy\s*\{[\s\S]*max-width:\s*297px[\s\S]*font-size:\s*14px/, "phone hero copy is constrained and smaller");
assert.match(phoneMedia, /\.countdown\s*\{[\s\S]*flex-direction:\s*column/, "phone countdown stacks the label above counters");
assert.match(phoneMedia, /\.site-header\s*\{[\s\S]*grid-template-columns:\s*44px 1fr 44px/, "phone header reserves center column for the logo");
assert.match(phoneMedia, /\.brand\s*\{[\s\S]*grid-column:\s*2[\s\S]*justify-self:\s*center/, "phone brand logo is centered");
assert.match(phoneMedia, /\.menu-toggle\s*\{[\s\S]*grid-column:\s*3/, "phone hamburger remains on the right");
