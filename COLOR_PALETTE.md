# 🎨 Build Bharat Synergy Partners (BBSP) — Color Palette & Design System

Comprehensive reference guide for the color palette, design tokens, gradients, and styling guidelines used across the **Build Bharat Synergy Partners** platform.

---


## 📑 Table of Contents
1. [Brand Philosophy & Overview](#-brand-philosophy--overview)
2. [Primary Brand & UI Theme](#-primary-brand--ui-theme)
3. [Ecosystem Pillar Colors](#-ecosystem-pillar-colors)
4. [Tailwind Extended Color Tokens](#-tailwind-extended-color-tokens)
5. [CSS Custom Properties (Variables)](#-css-custom-properties-variables)
6. [Gradients, Glassmorphism & Backgrounds](#-gradients-glassmorphism--backgrounds)
7. [Typography & Hierarchy](#-typography--hierarchy)
8. [Usage Guidelines & Best Practices](#-usage-guidelines--best-practices)

---

## 🏛️ Brand Philosophy & Overview

The BBSP color architecture is engineered around a clean, high-contrast, premium corporate identity:
- **Primary Base**: Crisp light grey canvas (`#EBEBEB`) paired with pure white high-contrast card surfaces (`#FFFFFF`).
- **Signature Tone**: Deep Royal Blue (`#10367D`), conveying trust, authority, institutional strength, and synergy.
- **Pillar Identifiers**: Tailored oceanic/sky blue spectrums providing visual distinction across all 4 key verticals (Solar, Loans, Real Estate, EdTech).

---

## 🔷 Primary Brand & UI Theme

| Token Name | Hex Code / Value | RGB / RGBA | Role / Usage |
| :--- | :--- | :--- | :--- |
| **Deep Royal Blue (Primary)** | `#10367D` | `rgb(16, 54, 125)` | Main brand color, primary headings, key buttons, links, strong emphasis |
| **Secondary Accent Blue** | `#1A4594` | `rgb(26, 69, 148)` | Subheadings, secondary badges, hover states, interactive elements |
| **Muted Blue / Dim** | `rgba(16, 54, 125, 0.6)` | `rgba(16, 54, 125, 0.6)` | Supporting descriptions, timestamps, secondary labels |
| **Light Canvas Background** | `#EBEBEB` | `rgb(235, 235, 235)` | Full-screen page body background (`--bg-dark`) |
| **Card / Surface White** | `#FFFFFF` | `rgb(255, 255, 255)` | Component containers, modals, white card surfaces (`--bg-card`) |
| **Surface Hover** | `#FAF9F6` | `rgb(250, 249, 246)` | Subtle card hover interactions (`--bg-card-hover`) |
| **Glass Background** | `rgba(255, 255, 255, 0.85)` | `rgba(255, 255, 255, 0.85)` | Frosted glass navigation bars and floating overlays |
| **Subtle Border** | `rgba(16, 54, 125, 0.12)` | `rgba(16, 54, 125, 0.12)` | Card borders, dividers, subtle separators |
| **Border Highlight** | `rgba(165, 206, 224, 0.6)` | `rgba(165, 206, 224, 0.6)` | Active card highlights, focused input borders |
| **Brand Glow** | `rgba(16, 54, 125, 0.05)` | `rgba(16, 54, 125, 0.05)` | Subtle ambient background glows |

---

## 🌐 Ecosystem Pillar Colors

Each of the four core pillars in `src/data/ecosystemData.ts` features a distinct accent and gradient treatment:

### 1. ☀️ Solar / Renewable Energy
- **Accent Hex**: `#A5CEE0` *(Ice / Sky Blue)*
- **RGB Glow**: `rgba(165, 206, 224, 0.25)`
- **Background Gradient**: `linear-gradient(135deg, rgba(165, 206, 224, 0.15) 0%, rgba(11, 39, 92, 0.95) 100%)`
- **Application**: Solar badges, power metrics, clean energy cards, ROI charts.

### 2. 💰 Loans / Financial Services
- **Accent Hex**: `#80B5CE` *(Soft Teal Blue)*
- **RGB Glow**: `rgba(128, 181, 206, 0.25)`
- **Background Gradient**: `linear-gradient(135deg, rgba(128, 181, 206, 0.15) 0%, rgba(11, 39, 92, 0.95) 100%)`
- **Application**: Capital disbursement metrics, interest rate calculators, financial trust seals.

### 3. 🏢 Real Estate / Infrastructure
- **Accent Hex**: `#5A9CBE` *(Medium Ocean Blue)*
- **RGB Glow**: `rgba(90, 156, 190, 0.25)`
- **Background Gradient**: `linear-gradient(135deg, rgba(90, 156, 190, 0.15) 0%, rgba(11, 39, 92, 0.95) 100%)`
- **Application**: Property square footage metrics, eco-villas, commercial park highlights.

### 4. 🎓 Education / EdTech
- **Accent Hex**: `#3B7E9F` *(Deep Steel Blue)*
- **RGB Glow**: `rgba(59, 126, 159, 0.25)`
- **Background Gradient**: `linear-gradient(135deg, rgba(59, 126, 159, 0.15) 0%, rgba(11, 39, 92, 0.95) 100%)`
- **Application**: Upskilling stats, cohort completion badges, career placement metrics.

---

## ⚙️ Tailwind Extended Color Tokens

Defined in `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brandGold: '#D57530',   // Warm Terracotta / Amber
        solar: '#D57530',       // Warm Solar Highlight
        loans: '#9FB768',       // Sage Green
        realty: '#FFBC92',      // Peach / Warm Coral
        edtech: '#FBF8E0',      // Soft Pale Cream
        darkBase: '#FAF9F6',    // Warm off-white
        darkSurface: '#FFFFFF', // Pure white
        stone: {
          550: '#78716c',
          605: '#57534e',
          650: '#514d4a',
          750: '#2d2a29',
          805: '#22201f',
          850: '#1d1b1a',
          905: '#100e0d',
        }
      }
    }
  }
}
```

---

## 💻 CSS Custom Properties (Variables)

Defined in `src/index.css`:

```css
:root {
  /* Surfaces & Backgrounds */
  --bg-dark: #EBEBEB;                 /* Primary light grey page canvas */
  --bg-card: #FFFFFF;                 /* Pure white surface cards */
  --bg-card-hover: #FAF9F6;           /* Subtle warm off-white hover */
  --bg-glass: rgba(255, 255, 255, 0.85); /* Glassmorphism layer */
  
  /* Borders & Dividers */
  --border-color: rgba(16, 54, 125, 0.12);
  --border-highlight: rgba(165, 206, 224, 0.6);
  
  /* Text & Typography */
  --text-main: #10367D;               /* Primary deep royal blue */
  --text-muted: #1A4594;              /* Secondary royal blue */
  --text-dim: rgba(16, 54, 125, 0.6); /* Low-emphasis blue */
  
  /* Brand Accents */
  --brand-gold: #10367D;
  --brand-gold-glow: rgba(16, 54, 125, 0.05);
  
  /* Pillar Variables */
  --solar-color: #10367D;
  --solar-glow: rgba(165, 206, 224, 0.15);
  
  --loans-color: #10367D;
  --loans-glow: rgba(128, 181, 206, 0.15);
  
  --realty-color: #10367D;
  --realty-glow: rgba(90, 156, 190, 0.15);
  
  --edtech-color: #10367D;
  --edtech-glow: rgba(59, 126, 159, 0.15);

  /* Border Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 24px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
}
```

---

## 🪟 Gradients, Glassmorphism & Backgrounds

### 1. Interactive Grid Pattern
```css
.bg-grid-pattern {
  background-image: 
    radial-gradient(circle at 50% 0%, rgba(16, 54, 125, 0.08) 0%, transparent 60%),
    linear-gradient(to right, rgba(16, 54, 125, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(16, 54, 125, 0.06) 1px, transparent 1px);
  background-size: 100% 100%, 45px 45px, 45px 45px;
}
```

### 2. Glassmorphism Panels
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(16, 54, 125, 0.12);
}
```

---

## ✍️ Typography & Hierarchy

- **Primary Font Family**: `Sora`, `Plus Jakarta Sans`, sans-serif
- **Headings & Badges**: `Sora`, `Outfit`, sans-serif
- **Main Heading Style**: Bold `#10367D`, tracking-tight
- **Subheadings**: Semi-bold `#1A4594`
- **Body & Paragraphs**: Regular `#10367D` with opacity levels (`opacity-80` to `opacity-90`)

---

## 📐 Usage Guidelines & Best Practices

1. **High Contrast First**: Always render primary content on `#FFFFFF` cards or against the `#EBEBEB` backdrop using `#10367D` text for maximum legibility (AAA compliant).
2. **Subtle Elevation**: Use `border: 1px solid rgba(16, 54, 125, 0.12)` rather than heavy black box shadows to keep the design airy and institutional.
3. **Pillar Differentiation**: Use the respective pillar accent colors (`#A5CEE0`, `#80B5CE`, `#5A9CBE`, `#3B7E9F`) for icons, badges, borders, and ambient glow effects when spotlighting specific business sectors.
