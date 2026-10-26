# Summit Motors - Car Selling Website

A modern car dealership & vehicle sales website designed in **Relume** and built with clean, responsive semantic HTML5, CSS design tokens (Finsweet Client-First compatible), and modular JavaScript.

---

## 🔗 Project Links
- **Relume Wireframe:** [https://k4ny5pye.relumesite.ai](https://k4ny5pye.relumesite.ai)
- **Relume Project:** [Relume App Site](https://www.relume.ai/app/site/01a17605-cbf5-7bfb-a204-cddde73b3aa8)

---

## 🚗 Core Pages & Features

| Page | File | Key Features |
| :--- | :--- | :--- |
| **Home** | [`index.html`](file:///C:/Users/Osias/car-selling-website/index.html) | Hero proposition, Featured vehicle showcase, 3 Guarantees, 3-Step buying workflow, Interactive finance calculator widget, Customer testimonials, FAQ accordion, Forecourt location & Test drive booking modal. |
| **Inventory** | [`inventory.html`](file:///C:/Users/Osias/car-selling-website/inventory.html) | Live keyword search, multifaceted filters (Make, Body Style, Fuel), sorting (Price, Mileage, Year), and dynamic vehicle card rendering. |
| **Vehicle Detail** | [`car-detail.html`](file:///C:/Users/Osias/car-selling-website/car-detail.html) | Dynamic vehicle showcase loaded by `?id=car-xxx`, image gallery with interactive thumbnail switching, technical specs table, feature list, and pre-selected test drive booking. |
| **Sell Your Car** | [`sell-your-car.html`](file:///C:/Users/Osias/car-selling-website/sell-your-car.html) | 3-step part-exchange & vehicle valuation request form, outstanding finance settlement workflow, same-day payment details. |
| **Finance** | [`finance.html`](file:///C:/Users/Osias/car-selling-website/finance.html) | Comprehensive loan calculator with real-time monthly payment calculation based on vehicle price, deposit percentage, term length, and fixed APR. |
| **About Us** | [`about.html`](file:///C:/Users/Osias/car-selling-website/about.html) | Showroom philosophy, 150-point diagnostic inspection process, customer guarantees, and team standards. |
| **Contact** | [`contact.html`](file:///C:/Users/Osias/car-selling-website/contact.html) | Riyadh forecourt address, operating hours, direct phone, WhatsApp link, and message inquiry form. |

---

## 📁 Folder Structure

```text
car-selling-website/
├── assets/
│   ├── css/
│   │   └── styles.css          # Design system tokens, utilities & responsive layouts
│   ├── branding/               # Logos & badges
│   └── cars/                   # Vehicle gallery assets
├── data/
│   └── cars-sample.json        # 8-car verified inventory database & CMS specs
├── docs/
│   └── project-overview.md     # Architecture & Webflow CMS schema
├── scripts/
│   ├── app.js                  # Global UI (mobile drawer, modal dialogs, FAQ, toasts)
│   ├── calculator.js           # Auto finance monthly repayment math & slider synchronization
│   ├── inventory.js            # Dynamic inventory filtering, search & card generation
│   └── verify-site.js          # Automated integrity & schema validation test suite
├── index.html                  # Homepage
├── inventory.html              # Inventory listing
├── car-detail.html             # Dynamic vehicle detail view
├── sell-your-car.html          # Part-exchange valuation
├── finance.html                # Auto finance calculator
├── about.html                  # Forecourt history & 150-point inspection
├── contact.html                # Forecourt hours, location & inquiries
├── package.json
└── README.md
```

---

## ⚡ Running & Testing

### Run Automated Tests
```powershell
npm test
```
Validates all HTML pages, internal links, script modules, and confirms the `cars-sample.json` database schema.

### Launch Local Server
```powershell
# Using Python
python -m http.server 3000

# Or using Node
npx serve . -l 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
