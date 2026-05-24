# Skevos — React Vite Redesign Spec
**Date:** 2026-05-24

## Context

The current Skevos website is a single HTML file loading React via CDN with Babel transpiling JSX in-browser. This works but is slow to load, hard to maintain, and not structured for growth. The goal is to migrate it to a proper Vite + React project with:
- A real component structure (one file per section)
- Bilingual support (Greek + English) via a simple language context
- Smooth Framer Motion animations throughout
- The accent colour changed from rust/terra to mint (`#519071`)
- All warm cream/bone tones preserved

---

## Colour System

**Removed:**
- `--terra: #8E3A1C`
- `--terra-2: #B85A37`

**Added:**
- `--mint: #519071` — primary accent (buttons, tags, highlights)
- `--mint-2: #6BAF8E` — hover/lighter variant of mint

**Kept unchanged:**
- `--bone: #F2EBE0`, `--paper: #ECE3D3`, `--cream: #E4D8C2`
- `--ink: #1B1815`, `--ink-2: #2A2622`
- `--stone: #6F665C`, `--mist: #A89F92`, `--gold: #B89465`
- `--r-lg: 38px`, `--r-md: 24px`, `--r-sm: 14px`
- `--shadow-lg`, `--shadow-md`, `--shadow-soft`

---

## Project Structure

```
skevos-vite/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Collection.jsx
│   │   ├── MarblePiece.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   └── LanguageContext.jsx
│   ├── i18n/
│   │   ├── en.js
│   │   └── gr.js
│   └── styles/
│       ├── variables.css
│       └── global.css
```

---

## Language System

A lightweight custom React context — no external library needed for two languages.

**`LanguageContext.jsx`** exports:
- `LanguageProvider` — wraps the app, stores `lang` state (`'en'` | `'gr'`)
- `useLanguage()` hook — returns `{ lang, setLang, t }` where `t(key)` looks up the current language's string

**`i18n/en.js`** and **`i18n/gr.js`** — plain JS objects with all site strings keyed identically. Example:
```js
// en.js
export default {
  hero_headline: "Stone, patiently shaped.",
  hero_description: "A small atelier in the Cyclades...",
  nav_collection: "Collection",
  nav_about: "Atelier",
  nav_contact: "Contact",
  nav_cta: "Commission",
  // ... all strings
}
```

Every component calls `const { t } = useLanguage()` and renders `t('key')` instead of hardcoded text. Product names stay in Latin (Greek mythology names don't need translation). Material names stay in Italian. Prices and dimensions are language-neutral.

---

## Navbar

- Fixed, `backdrop-filter: blur` on scroll (same as current behaviour — triggers at 30px scroll)
- Right side: `GR | EN` pill toggle + "Commission" CTA button, both in `--mint`
- Active language highlighted with `--mint` background; inactive is muted
- On language switch: the pill swaps, the page content crossfades (handled in App.jsx)

---

## Animations

All animations powered by **Framer Motion**.

### 1. Section fade-in on scroll
Each section wrapped in a `<motion.section>` with `useInView`. When it enters the viewport, it animates from `{ opacity: 0, y: 40 }` to `{ opacity: 1, y: 0 }`, duration 0.6s, easing `easeOut`.

### 2. Language crossfade
`App.jsx` wraps all page content in `<AnimatePresence>`. On language change, content fades out (`opacity: 0`, 0.15s) then fades in with new strings (`opacity: 1`, 0.3s). The `key` prop on the content block is set to `lang` to trigger re-mount.

### 3. Staggered collection cards
`Collection.jsx` wraps the card grid in `<motion.div>` with `staggerChildren: 0.06`. Each `CollectionCard` animates in with `{ opacity: 0, y: 24 }` → `{ opacity: 1, y: 0 }`.

### 4. Smooth scroll
`index.html` / global CSS: `scroll-behavior: smooth`. Nav links use `href="#section-id"`. Fixed navbar offset handled via `scroll-margin-top: 80px` on each section.

---

## Components

### `Navbar.jsx`
- Props: none (reads lang from context)
- State: `scrolled` (boolean, from scroll event listener)
- Renders: logo, nav links (translated), lang toggle, CTA button

### `Hero.jsx`
- Animated entry (fade + scale on mount)
- Headline, description, two CTA buttons — all translated
- Featured product card (Helena · Pedestal) with marble SVG

### `Collection.jsx`
- Staggered card grid (8 items)
- Each card: marble SVG (A/B hover swap), product info, translated labels
- Hover: scale up, shadow, show material tag, swap to B texture

### `MarblePiece.jsx`
- Direct port of current `marble.jsx`
- Accepts `index`, `variant` (`'a'`|`'b'`), `seed` props
- Generates SVG marble texture — no changes to logic

### `About.jsx`
- Dark section, translated heading + body text
- Stats grid (52 years, 8 quarries, 3 hands) — numbers stay, labels translated

### `Contact.jsx`
- Email + message form
- Form state: idle → sending → sent (same as current)
- Address, hours, email — translated labels

### `Footer.jsx`
- Copyright, Greek tagline (stays in Greek in both languages as a brand element)

---

## Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "framer-motion": "^11.0.0"
}
```

Dev: `vite`, `@vitejs/plugin-react`

Fonts loaded via Google Fonts link in `index.html` (same as current — Cormorant Garamond + Manrope).

---

## Greek Translations (all strings)

| Key | English | Greek |
|-----|---------|-------|
| `nav_collection` | Collection | Συλλογή |
| `nav_about` | Atelier | Εργαστήριο |
| `nav_contact` | Contact | Επικοινωνία |
| `nav_cta` | Commission | Παραγγελία |
| `hero_eyebrow` | Est. Tinos, 1974 · Σκεῦος | Ιδρ. Τήνος, 1974 · Σκεῦος |
| `hero_headline` | Stone, patiently shaped. | Πέτρα, με υπομονή πελεκημένη. |
| `hero_description` | A small atelier in the Cyclades carving heirloom furniture from a single block… | Ένα μικρό εργαστήριο στις Κυκλάδες που σκαλίζει έπιπλα κληρονομιάς από ένα μονοκόμματο μάρμαρο… |
| `hero_btn_collection` | See the Collection | Δες τη Συλλογή |
| `hero_btn_about` | The atelier | Το εργαστήριο |
| `collection_eyebrow` | The Collection · Spring 26 | Η Συλλογή · Άνοιξη 26 |
| `collection_heading` | Eight pieces, each cut once. | Οκτώ κομμάτια, το καθένα κομμένο μία φορά. |
| `collection_description` | Hover any piece to see it from a second light… | Τοποθέτησε τον κέρσορα σε κάθε κομμάτι για να το δεις από άλλη οπτική… |
| `collection_lead_time` | All works are made to order with a 12–16 week lead time. | Όλα τα έργα κατασκευάζονται κατόπιν παραγγελίας με χρόνο παράδοσης 12–16 εβδομάδες. |
| `card_from` | from | από |
| `card_featured` | Featured | Επιλεγμένο |
| `about_eyebrow` | The Atelier | Το Εργαστήριο |
| `about_heading` | Three generations, one chisel rhythm. | Τρεις γενιές, ένας ρυθμός σμίλης. |
| `about_body` | Skevos began in a Pyrgos courtyard in 1974… | Ο Σκεύος ξεκίνησε σε μια αυλή του Πύργου το 1974… |
| `about_stat_1` | Years carving | Χρόνια σκάλισμα |
| `about_stat_2` | Quarries within reach | Λατομεία σε κοντινή απόσταση |
| `about_stat_3` | Hands per piece | Χέρια ανά κομμάτι |
| `about_img_label` | Workshop · Pyrgos, Tinos | Εργαστήριο · Πύργος, Τήνος |
| `contact_eyebrow` | Begin a commission | Ξεκίνα μια παραγγελία |
| `contact_heading` | Leave us your address. | Άφησέ μας τη διεύθυνσή σου. |
| `contact_description` | Tell us the piece you have in mind… | Πες μας το κομμάτι που σκέφτεσαι… |
| `contact_address_label` | Atelier | Εργαστήριο |
| `contact_hours_label` | Hours | Ώρες |
| `contact_direct_label` | Direct | Άμεσα |
| `contact_email_placeholder` | you@somewhere | εσύ@κάπου |
| `contact_message_placeholder` | Tell us about the room, the piece, the dream… | Πες μας για το δωμάτιο, το κομμάτι, το όνειρο… |
| `contact_btn_idle` | Send enquiry ↘ | Αποστολή αιτήματος ↘ |
| `contact_btn_sending` | Sending... | Αποστολή... |
| `contact_btn_sent` | Thank you — we'll be in touch ✓ | Ευχαριστούμε — θα επικοινωνήσουμε ✓ |
| `contact_reply` | We reply within two working days | Απαντάμε εντός δύο εργάσιμων ημερών |
| `footer_copyright` | © 2026 Mavromatis Atelier · Pyrgos · Tinos | © 2026 Εργαστήριο Μαυρομάτη · Πύργος · Τήνος |
| `hero_scroll` | Scroll ↓ | Κύλιση ↓ |
| `hero_edition` | Edition 26 · Spring | Έκδοση 26 · Άνοιξη |
| `hero_made` | Made in Greece | Φτιαγμένο στην Ελλάδα |

---

## Verification

1. `npm run dev` starts Vite dev server — site loads at localhost:5173
2. All 6 sections render visually identical to the current site (aside from mint accent)
3. Clicking GR/EN toggle swaps all text strings and fades the page
4. Scrolling down triggers fade-in animations on each section
5. Collection cards stagger in and swap marble textures on hover
6. Nav links scroll smoothly to their sections with correct offset
7. Contact form validates email, cycles through idle → sending → sent states
8. Both languages display correctly in mobile viewport (≤768px)
