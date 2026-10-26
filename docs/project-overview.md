# Project Overview: Car Selling Business Website

## 1. Project Summary
- **Business Type**: Car Dealership & Auto Sales (New & Pre-Owned Vehicles)
- **Primary Objectives**:
  - Showcase available inventory with filtering (make, model, year, price, body style, fuel type).
  - Enable vehicle inquiry and test-drive scheduling.
  - Present dealership credibility, customer testimonials, and financing options.
  - Deliver seamless mobile-first responsiveness and high conversion rates.

---

## 2. Recommended Site Architecture

| Page | Purpose | Key Relume / Webflow Components |
| :--- | :--- | :--- |
| **Home** | Hero value proposition, quick vehicle search, featured cars, value props, testimonials. | Header / Hero, Filter Bar, Gallery / Card Grid, Feature list, Testimonials, CTA. |
| **Inventory (Browse Cars)** | Full searchable listing of vehicles with multifaceted filters and sorting. | Filter/Search Component, CMS Collection Grid, Pagination. |
| **Vehicle Detail (CMS)** | Individual car showcase: image carousel, technical specs, price breakdown, test-drive form. | Image Slider / Gallery, Spec Table, Loan Calculator, Inquiry Form. |
| **Financing & Trade-in** | Auto loan calculator, pre-approval application form, trade-in value estimator. | Calculator Widget, Step-form / Application. |
| **About Us** | Dealership history, showroom team, customer guarantees, location & hours. | Team Grid, Timeline / Story, Map & Contact Info. |
| **Contact / Test Drive** | Direct inquiry form, showroom location map, hours, click-to-call / WhatsApp. | Contact Form, Google Maps Embed, Location Card. |

---

## 3. Webflow CMS Schema for Vehicles

To power the vehicle inventory in Webflow, the CMS collection should contain:
- `Name` (e.g., "2023 BMW M3 Competition")
- `Slug` (URL-friendly handle)
- `Price` (Number / Currency)
- `Year` (Number, e.g., 2023)
- `Make` (Reference or Text, e.g., "BMW")
- `Model` (Text, e.g., "M3")
- `Body Style` (Option: Sedan, SUV, Coupe, Truck, Convertible)
- `Mileage` (Number, e.g., 18500)
- `Transmission` (Option: Automatic, Manual, Dual-Clutch)
- `Fuel Type` (Option: Gasoline, Diesel, Hybrid, Electric)
- `Drivetrain` (Option: AWD, RWD, FWD, 4WD)
- `Exterior Color` (Text)
- `Interior Color` (Text)
- `VIN` (Text)
- `Main Image` (Image)
- `Gallery Images` (Multi-Image field)
- `Featured` (Switch: Yes / No)
- `Status` (Option: Available, Pending, Sold)
