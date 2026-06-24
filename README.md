# МАТРЕСО — Static Site (MAREKO template)

Static Macedonian website for **МАТРЕСО** / **matreso.mk**, built from the MAREKO/EKO OIL site structure.

## Quick start

Open `index.html` in a browser, or serve the folder locally:

```bash
npx serve .
```

## Configuration

Edit the `SITE` object at the top of `assets/js/main.js`:

- Company name, legal name, domain, email, phone, address
- Logo path, price list PDF, map coordinates
- `DOCUMENTS`, `PARTNERS`, and `SEARCH_INDEX` arrays

## Structure

```
MATRESO-SITE/
├── index.html
├── za-nas.html
├── kontakt.html
├── zachlenuvanje.html
├── dokumenti.html
├── partneri.html
├── sitemap.xml
├── robots.txt
└── assets/
    ├── css/styles.css
    ├── js/main.js
    ├── images/
    └── docs/
```

## TODO checklist

- [ ] Confirm full legal name in `SITE.legalName`
- [ ] Replace `assets/images/matreso-logo.svg` placeholder or use final vector logo
- [ ] Populate `PARTNERS` array in `main.js` when partner list is available
- [ ] Verify Google Maps embed coordinates for office location
- [ ] Deploy to hosting and point `matreso.mk` DNS
- [ ] Remove loose source files from project root after deploy

## Notes

- **No** `sobirni-mesta` or `web-pristap` pages
- Partners page shows a placeholder until `PARTNERS` is filled in
- Theme colors match MATRESO logo blue (`#1b4b7a` palette)
- Homepage cenovnik: `assets/docs/MATRESO-CENOVNIK-2026.pdf`
- Documents page: postapka 2025/2024, cenovnik, raskinati dogovori
- Membership PDF: `assets/docs/registacija-template.pdf`
