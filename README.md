# MJCK Motors - Car Selling Website

A modern, high-end car dealership & vehicle sales website designed in **Relume** and built with clean, responsive semantic HTML5, CSS automotive design tokens (Finsweet Client-First compatible), and modular JavaScript.

---

## 🚗 Core Pages & Features

| Page | File | Key Features |
| :--- | :--- | :--- |
| **Home** | [`index.html`](file:///C:/Users/Osias/car-selling-website/index.html) | Automotive showroom hero, Featured vehicle showcase in PHP, 3 Guarantees, 3-Step buying workflow, Interactive finance calculator widget, Customer testimonials, FAQ accordion, Forecourt location & Test drive booking modal. |
| **Inventory** | [`inventory.html`](file:///C:/Users/Osias/car-selling-website/inventory.html) | Live keyword search, multifaceted filters (Make, Body Style, Fuel), sorting in PHP (Price, Mileage, Year), and dynamic vehicle card rendering. |
| **Vehicle Detail** | [`car-detail.html`](file:///C:/Users/Osias/car-selling-website/car-detail.html) | Dynamic vehicle showcase loaded by `?id=car-xxx`, image gallery with interactive thumbnail switching, technical specs table, feature list, and pre-selected test drive booking. |
| **Sell Your Car** | [`sell-your-car.html`](file:///C:/Users/Osias/car-selling-website/sell-your-car.html) | 3-step part-exchange & vehicle valuation request form, bank finance settlement workflow, same-day payment details. |
| **Finance** | [`finance.html`](file:///C:/Users/Osias/car-selling-website/finance.html) | Comprehensive PHP auto loan calculator with real-time monthly payment calculation based on vehicle price, down payment percentage, term length, and fixed bank APR. |
| **About Us** | [`about.html`](file:///C:/Users/Osias/car-selling-website/about.html) | MJCK showroom philosophy, 150-point diagnostic inspection process, customer guarantees, and team standards. |
| **Contact** | [`contact.html`](file:///C:/Users/Osias/car-selling-website/contact.html) | Flagship showroom address, operating hours, direct phone, mobile link, and message inquiry form. |

---

## 📁 Folder Structure

```text
car-selling-website/
├── assets/
│   ├── css/
│   │   └── styles.css          # Showroom design tokens, carbon fiber & mesh textures, glow effects
│   ├── branding/               # Logos & badges
│   └── cars/                   # Vehicle gallery assets
├── data/
│   └── cars-sample.json        # 8-car verified inventory database in PHP (₱)
├── docs/
│   └── project-overview.md     # Architecture & Webflow CMS schema
├── scripts/
│   ├── app.js                  # Global UI (mobile drawer, modal dialogs, FAQ, toasts)
│   ├── calculator.js           # Auto finance monthly repayment math (PHP format)
│   ├── inventory.js            # Dynamic inventory filtering, search & card generation
│   └── verify-site.js          # Automated integrity & schema validation test suite
├── index.html                  # Homepage
├── inventory.html              # Inventory listing
├── car-detail.html             # Dynamic vehicle detail view
├── sell-your-car.html          # Part-exchange valuation
├── finance.html                # Auto finance calculator
├── about.html                  # Showroom standards & 150-point inspection
├── contact.html                # Showroom hours, location & inquiries
├── start-site.bat              # 1-click launcher for Windows
├── package.json
└── README.md
```

---

## ⚡ Running & Testing

### Run Automated Tests
```powershell
npm test
```

### Launch Local Server (1-Click)
Double-click [`start-site.bat`](file:///C:/Users/Osias/car-selling-website/start-site.bat) or run:
```powershell
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
