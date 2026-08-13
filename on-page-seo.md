# On-Page SEO Checklist — Required Specifications for Every Page

Every page-generation skill and build script must read and enforce this spec before generating any page.

---

## 1. Head & Metadata (What Google indexes first)
- [ ] **Title Tag**: 50–60 characters, primary keyword near the start.
- [ ] **Meta Description**: 150–160 characters, keyword + benefit + soft CTA.
- [ ] **Canonical URL**: Explicit `<link rel="canonical" href="...">` set to clean extensionless URL.
- [ ] **Open Graph Tags**: `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type` ("website" or "article").
- [ ] **Twitter Card Tags**: `twitter:card` ("summary_large_image"), `twitter:title`, `twitter:description`, `twitter:image`.
- [ ] **Language Attribute**: `<html lang="en-GB">`.
- [ ] **Viewport Tag**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- [ ] **Favicons**: `/favicon.ico`, `/favicon-32x32.png`, `/favicon-48x48.png`, `/favicon-192x192.png`, `/apple-touch-icon.png`.
- [ ] **Charset Meta**: `<meta charset="UTF-8">`.

---

## 2. URL Structure (Clean, readable, keyword-forward)
- [ ] **Short Slug**: Under 60 characters.
- [ ] **Primary Keyword**: Keyword included in the URL slug.
- [ ] **Formatting**: Hyphens only, strictly lowercase, no trailing `.html` extensions.
- [ ] **No Stop Words**: Remove unnecessary filler words unless required for exact match local SEO.

---

## 3. Headings (Structure for skimmers & bots)
- [ ] **Single H1**: Exactly one `<h1>` per page containing primary keyword.
- [ ] **Logical Hierarchy**: Strict `H1` → `H2` → `H3` progression (no skipped levels).
- [ ] **Keyword Integration**: H2s/H3s use supporting keywords + question-based titles for RAG chunking.

---

## 4. Copy & Body (Answer the query, fast)
- [ ] **First 100 Words**: Primary keyword included within the initial 100 words.
- [ ] **Direct Answer Box**: 1-2 sentence direct answer in the first paragraph/section.
- [ ] **Short Paragraphs**: 1–4 sentences per paragraph for skimmability.
- [ ] **Formatting**: Bullets (`<ul>`), numbered lists (`<ol>`), and bold key phrases.

---

## 5. FAQ Section (Every service page & post)
- [ ] **Questions**: 4–8 questions targeting SEMrush/PAA local queries.
- [ ] **Direct Answers**: 2–4 sentences per answer.
- [ ] **FAQ Schema**: `FAQPage` JSON-LD schema applied in `<head>`.

---

## 6. Images (Every image is a ranking signal)
- [ ] **Alt Text**: Descriptive alt text with natural keywords on all content images.
- [ ] **Filenames**: Hyphen-separated descriptive filenames (e.g. `block-paving-glasgow.webp`).
- [ ] **Format & Size**: WebP format, compressed under 200 KB.
- [ ] **Dimensions**: Explicit `width` and `height` attributes to prevent CLS.
- [ ] **Lazy Loading**: `loading="lazy"` and `decoding="async"` for below-the-fold assets.
- [ ] **Social Sharing Image**: Featured image specified in Open Graph / Twitter cards.

---

## 7. Internal Links (Pass authority across the site)
- [ ] **Link Count**: 3–5 internal links per page/post.
- [ ] **Anchor Text**: Descriptive, keyword-rich anchor text (never "click here" or "read more").
- [ ] **Breadcrumbs**: Visible breadcrumbs (`Home > Category > Page`) on every page.
- [ ] **Breadcrumb Schema**: `BreadcrumbList` JSON-LD schema applied.

---

## 8. External Links (Cite authority)
- [ ] **Authority Citations**: 2–3 external links to authoritative sources (.gov, .edu, British Standards BS 5628, Scottish Water SuDS).
- [ ] **Link Attributes**: `target="_blank"` with `rel="noopener"`.

---

## 9. Schema Markup (JSON-LD in `<head>`)
- [ ] **LocalBusiness / HomeAndConstructionBusiness**: Detailed company schema (`name`, `telephone`, `email`, `areaServed`, `knowsAbout`, `founder`).
- [ ] **Service Schema**: On all service pages.
- [ ] **FAQPage Schema**: Wherever FAQ section exists.
- [ ] **BreadcrumbList Schema**: On every page.
- [ ] **Organization / TechArticle Schema**: As applicable.

---

## 10. E-E-A-T Signals (Experience, Expertise, Authority, Trust)
- [ ] **Author / Founder**: Joe Church (Managing Director & Lead Mason) cited.
- [ ] **Credentials**: Years of experience, trade qualifications, British Standards mentioned.
- [ ] **Contact Info**: Phone number (`+44 7884 248274`), real address, email, social links.

---

## 11. Accessibility (A11y signals = SEO signals)
- [ ] **Semantic HTML**: `<header>`, `<main>`, `<section>`, `<aside>`, `<article>`, `<footer>`.
- [ ] **ARIA Labels**: `aria-label` on buttons, nav toggles, and social icons.
- [ ] **Color Contrast**: Meets WCAG AA (4.5:1 ratio).
- [ ] **Skip-to-Content**: `<a href="#main-content" class="skip-link">Skip to main content</a>`.

---

## 12. Mobile & Responsive (Mobile-first indexing)
- [ ] **Touch Targets**: Minimum 48×48 px for all clickable buttons/links.
- [ ] **Body Font**: Minimum 16 px base font size.
- [ ] **Zero Horizontal Scroll**: All tables wrapped in `.wp-spec-table-wrap` (`overflow-x: auto`), text word-wrapped.

---

## 13. Social Preview
- [ ] **OG Image**: 1200×630px social image.
- [ ] **Twitter Card Image**: 1200×600px summary_large_image.

---

## 14. Conversion Elements (Service Pages Only)
- [ ] **Above Fold CTA**: Primary CTA button ("Request Free Quote") in hero header.
- [ ] **Click-to-Call**: `tel:+447884248274` links on phone numbers.
- [ ] **Trust Badges**: 5.0 Google Rating badge, licensed contractor badges.
- [ ] **Service Areas**: Full list of covered areas (Clydebank, Glasgow, Bearsden, Milngavie, Newton Mearns).

---

## 15. Long-form Content & Usability
- [ ] **Table of Contents / Jump Links**: Anchor jump links for main sections on long-form content.
- [ ] **Back-to-Top**: Quick jump back to top of page.
