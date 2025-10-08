# Ogre Freight Brokerage - Design System

A comprehensive brand and design guide for the Ogre freight brokerage platform.

## Table of Contents

- [Brand Overview](#brand-overview)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Logo Usage](#logo-usage)
- [UI Components](#ui-components)
- [Tone of Voice](#tone-of-voice)
- [Usage Examples](#usage-examples)

---

## Brand Overview

### Mission
We connect shippers and carriers with powerful technology that makes freight brokerage simple, transparent, and efficient. Our brand reflects the strength and reliability needed to move America's freight.

### Brand Personality

**Reliable** - Dependable freight solutions that carriers and shippers trust to deliver on time, every time

**Efficient** - Streamlined operations that eliminate friction in the load matching and booking process

**Trustworthy** - Transparent pricing and communication that builds long-term partnerships in the supply chain

---

## Color Palette

### Primary Colors

#### Ogre Red
- **HEX:** `#6C3333`
- **RGB:** `108, 51, 51`
- **CMYK:** `0, 53, 53, 58`
- **Usage:** Logo, primary CTAs (Create Load, Book Carrier), brand moments
- **Note:** Use sparingly to maintain impact

#### Dark Gray
- **HEX:** `#1A1A1A`
- **RGB:** `26, 26, 26`
- **CMYK:** `0, 0, 0, 90`
- **Usage:** Primary text, headers, secondary buttons

#### Medium Gray
- **HEX:** `#666666`
- **RGB:** `102, 102, 102`
- **CMYK:** `0, 0, 0, 60`
- **Usage:** Secondary text, labels, helper text

### Status & Feedback Colors

#### Success Green
- **HEX:** `#10B981`
- **RGB:** `16, 185, 129`
- **Usage:** Delivered status, confirmations, success messages

#### Warning Yellow
- **HEX:** `#F59E0B`
- **RGB:** `245, 158, 11`
- **Usage:** In transit, at pickup, pending actions

#### Error Red
- **HEX:** `#EF4444`
- **RGB:** `239, 68, 68`
- **Usage:** Delays, errors, cancellations, critical alerts

#### Info Blue
- **HEX:** `#2563EB`
- **RGB:** `37, 99, 235`
- **Usage:** Links, informational badges, quoted status

### Background & Border Colors

#### White
- **HEX:** `#FFFFFF`
- **Usage:** Main background, cards, modals

#### Light Gray
- **HEX:** `#F9FAFB`
- **Usage:** Sidebar, table headers, subtle backgrounds

#### Border Gray
- **HEX:** `#E5E7EB`
- **Usage:** Card borders, dividers, input borders

---

## Typography

### Font Family
**Primary:** System font stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
```

### Type Scale

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| **H1** | 28px / 1.75rem | 600 | Page titles |
| **H2** | 20px / 1.25rem | 600 | Section headers |
| **H3** | 16px / 1rem | 600 | Subsection titles |
| **Body** | 14px / 0.875rem | 400 | Primary content |
| **Small** | 13px / 0.8125rem | 400 | Labels, captions |
| **Tiny** | 12px / 0.75rem | 500 | Badges, uppercase labels |

### Typography Best Practices

**Line Height:**
- Headings: 1.2
- Body text: 1.5
- Ensures comfortable reading

**Line Length:**
- Optimal: 60-80 characters
- Maximum: 100 characters

**Font Weights:**
- Regular (400): Body text
- Medium (500): Emphasis, labels
- Semi-Bold (600): Headings, buttons

---

## Logo Usage

### Primary Logo
**Color:** Ogre Red (#6C3333) on light backgrounds

**File Formats:**
- SVG (preferred for web)
- PNG (high-resolution for presentations)
- PDF (for print materials)

### Logo Variations
- **Light backgrounds:** Ogre Red (#6C3333)
- **Dark backgrounds:** White (#FFFFFF)

### Clear Space & Sizing
- **Minimum clear space:** 0.5x height of logo on all sides
- **Minimum logo height:** 24px (digital), 0.5in (print)

### Logo Do's and Don'ts

**✓ DO:**
- Maintain minimum clear space of 0.5x logo height
- Use approved color variations only
- Scale proportionally
- Ensure minimum size requirements

**✗ DON'T:**
- Distort or stretch the logo
- Add effects, shadows, or outlines
- Change the typeface or letter spacing
- Place on busy backgrounds
- Rotate or flip

---

## UI Components

### Status Badges

Status badges communicate order and load states clearly:

```html
<!-- Delivered -->
<span class="status-badge status-delivered">Delivered</span>

<!-- In Transit -->
<span class="status-badge status-transit">In Transit</span>

<!-- Delayed -->
<span class="status-badge status-delayed">Delayed</span>
```

**Status Colors:**
- **Delivered:** Green background (#10B981, 10% opacity)
- **In Transit / At Pickup:** Yellow background (#F59E0B, 10% opacity)
- **Quoted:** Blue background (#2563EB, 10% opacity)
- **Delayed:** Red background (#EF4444, 10% opacity)
- **Cancelled:** Gray background (#666666, 10% opacity)

### Document Type Labels

Small, uppercase badges for document types:

```html
<span class="doc-badge doc-bol">BOL</span>
<span class="doc-badge doc-pod">POD</span>
<span class="doc-badge doc-inv">INV</span>
<span class="doc-badge doc-ftl">FTL</span>
```

**Colors:**
- **BOL:** Blue (#2563EB)
- **POD:** Green (#10B981)
- **INV:** Yellow (#F59E0B)
- **FTL:** Ogre Red (#6C3333)
- **LTL:** Dark Gray (#1A1A1A)

### Buttons

#### Primary Buttons
- **Color:** Ogre Red (#6C3333)
- **Usage:** Primary CTAs like "Create Load", "Book Carrier", "Post Load"
- **Hover:** Darker shade (#5A2A2A)

#### Secondary Buttons
- **Color:** Dark Gray (#1A1A1A)
- **Usage:** "Save Draft", "Cancel", "Download All"
- **Hover:** Lighter shade (#333333)

#### Ghost Buttons
- **Color:** Transparent with border
- **Usage:** "Filter", "Export", "View Details"
- **Hover:** Light gray background

### Form Inputs

```html
<div class="form-group">
  <label class="form-label">Pickup Location</label>
  <input type="text" class="form-input" placeholder="Dallas, TX">
</div>
```

**Specifications:**
- Border: 1px solid #E5E7EB
- Border radius: 6px
- Padding: 8px 12px
- Focus state: Border color changes to Ogre Red with subtle shadow

### Tables

Data tables for load management:

**Header:**
- Background: Light Gray (#F9FAFB)
- Text: Medium Gray (#666666), uppercase, 12px
- Font weight: 600

**Rows:**
- Padding: 16px 24px
- Border: 1px solid #F0F1F3
- Hover: Light gray background (#F3F4F6)

---

## Tone of Voice

### Our Voice

We speak the language of logistics professionals. Our tone is **direct and efficient**, respecting that time is money in freight. We're **professional but human**, understanding the pressures of tight deadlines and the importance of clear communication between brokers, carriers, and shippers.

### Voice Characteristics

#### Clear & Direct
Use logistics terminology correctly. Be specific about rates, deadlines, and requirements. No fluff.

**✓ Good:** "Load booked at $2,400"
**✗ Bad:** "Your shipment is ready!"

#### Solution-Oriented
Focus on what's needed to move freight. Provide actionable next steps. Keep drivers and shippers informed.

**✓ Good:** "Carrier assigned. ETA 2 hours"
**✗ Bad:** "Things are moving along great!"

#### Honest & Transparent
Be upfront about delays, pricing, and capacity. Build trust through clear communication about what's happening with loads.

**✓ Good:** "Delivery delayed 3 hours - traffic"
**✗ Bad:** "Small hiccup, no worries!"

---

## Usage Examples

### Email Communications

#### Rate Confirmation (Good Example)
```
Subject: Load LD-24891 - Rate Confirmation

Load: Dallas, TX → Phoenix, AZ
Rate: $2,450 | 850 mi | $2.88/mi
Pickup: Oct 9, 8:00 AM CDT
Delivery: Oct 10, 2:00 PM MST
Equipment: Dry Van 53'

Rate con attached. Reply to confirm.
```

#### Status Updates (Good Example)
- "Picked up on time - Dallas, TX"
- "En route - ETA 2:00 PM MST"
- "Delivered - signed by J. Smith"
- "Delayed 90 min - traffic I-10"

### UI Copy Guidelines

| Context | Good Example | Bad Example |
|---------|-------------|-------------|
| **Error Messages** | "MC number required" | "Oops! Something went wrong" |
| **Success States** | "Load posted to 245 carriers" | "Your load has been successfully posted!" |
| **Empty States** | "No active loads. Post your first load." | "Nothing to see here..." |
| **CTAs** | "Book carrier" / "Post load" | "Click here!" / "Let's ship it!" |
| **Status Updates** | "Picked up - Dallas, TX. En route to Phoenix" | "Your shipment is on its way!" |
| **Rate Information** | "$2.45/mile - 850 miles - $2,082.50 total" | "Great rate available!" |

---

## File Structure

```
ogre-design-system/
├── index.html          # Interactive brand kit
├── styles.css          # Component styles
├── DESIGN.md          # This file
└── assets/
    └── logo/
        ├── ogre-logo.svg
        ├── ogre-logo.png
        └── ogre-logo-white.svg
```

---

## Development Guidelines

### CSS Variables

The design system uses CSS custom properties for consistency:

```css
:root {
    /* Brand Colors */
    --primary-color: #6C3333;
    --primary-hover: #5a2a2a;
    --secondary-color: #000000;

    /* Text Colors */
    --text-primary: #1a1a1a;
    --text-secondary: #666666;
    --text-muted: #999999;

    /* Status Colors */
    --success: #10b981;
    --warning: #f59e0b;
    --error: #ef4444;
    --info: #3b82f6;

    /* Spacing */
    --radius-sm: 4px;
    --radius-md: 6px;
    --radius-lg: 8px;
}
```

### Accessibility

- **Color Contrast:** All text meets WCAG AA standards (4.5:1 for normal text)
- **Focus States:** All interactive elements have visible focus indicators
- **Font Sizes:** Minimum 14px for body text, 12px for labels
- **Touch Targets:** Minimum 44px × 44px for interactive elements

---

## Questions or Feedback?

For questions about the design system or to propose changes, please open an issue in the repository.

**Last Updated:** October 2025
**Version:** 1.0
