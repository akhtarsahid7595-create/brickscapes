# How to Edit Your TurfWorld & Brickscapes Website

Welcome to your redesigned website, built with **100% TurfWorld structure, typography, colors, buttons, and UI/UX** (`https://turfworld.co.uk/`).

---

### 1. Changing Text & Products
All page content is located in `index.html`.
- Open `index.html` in any text editor.
- Search for product titles, prices, or descriptions to edit them.
- Save and refresh your browser.

---

### 2. Updating Turf Roll & Topsoil Pricing Rates
The interactive Turf Calculator rates are configured in `main.js`:
```javascript
const TURF_PRICE_PER_M2 = 6.00; // Price in £ per m²
```
Update this number to change the live price calculation on the website.

---

### 3. Adding New Photos
Photos are stored in `Assest/` and `images/`.
To add a photo to the gallery:
1. Save your image to `images/` or `Assest/`.
2. Open `index.html` and locate the `<div class="tw-gallery-grid">` section.
3. Duplicate a `<div class="tw-gal-item">` block and update the image `src` attribute.

---

### 4. Updating Contact & Phone Number
Search for `07700` or `447700900123` in `index.html` and `main.js` to change the telephone or WhatsApp link.

---
*Tip: Always keep a backup of index.html and style.css before making large updates.*
