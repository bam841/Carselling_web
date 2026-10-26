/**
 * Summit Motors - Automated Site Verification Script
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
let errors = 0;
let passes = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passes++;
  } else {
    console.error(`  [FAIL] ${message}`);
    errors++;
  }
}

console.log('=== 1. Checking Core HTML Pages ===');
const expectedPages = [
  'index.html',
  'inventory.html',
  'car-detail.html',
  'sell-your-car.html',
  'finance.html',
  'about.html',
  'contact.html'
];

expectedPages.forEach(page => {
  const filePath = path.join(rootDir, page);
  const exists = fs.existsSync(filePath);
  assert(exists, `Page exists: ${page}`);
  if (exists) {
    const content = fs.readFileSync(filePath, 'utf-8');
    assert(content.includes('<title>'), `${page} has a <title> tag`);
    assert(content.includes('navbar'), `${page} contains a navbar`);
    assert(content.includes('footer'), `${page} contains a footer`);
  }
});

console.log('\n=== 2. Checking Vehicle Inventory Data ===');
const dataPath = path.join(rootDir, 'data', 'cars-sample.json');
assert(fs.existsSync(dataPath), 'data/cars-sample.json exists');

try {
  const cars = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  assert(Array.isArray(cars) && cars.length >= 8, `Loaded ${cars.length} cars from database (>= 8 expected)`);

  const requiredFields = [
    'id', 'name', 'year', 'make', 'model', 'price',
    'mileage', 'bodyStyle', 'transmission', 'fuelType',
    'drivetrain', 'image', 'features'
  ];

  let allValid = true;
  cars.forEach(car => {
    requiredFields.forEach(field => {
      if (car[field] === undefined || car[field] === null || car[field] === '') {
        console.error(`  [FAIL] Car ${car.id || 'unknown'} is missing field: ${field}`);
        allValid = false;
        errors++;
      }
    });
  });

  if (allValid) {
    assert(true, 'All vehicle records satisfy schema validation');
  }
} catch (e) {
  assert(false, `JSON parsing failed: ${e.message}`);
}

console.log('\n=== 3. Checking Assets & Style References ===');
const cssPath = path.join(rootDir, 'assets', 'css', 'styles.css');
assert(fs.existsSync(cssPath), 'assets/css/styles.css exists');
const cssContent = fs.readFileSync(cssPath, 'utf-8');
assert(cssContent.includes('--color-brand-accent'), 'styles.css has design tokens defined');

console.log('\n=== 4. Checking Script Modules ===');
const scriptFiles = [
  'scripts/app.js',
  'scripts/calculator.js',
  'scripts/inventory.js'
];

scriptFiles.forEach(s => {
  const sp = path.join(rootDir, s);
  assert(fs.existsSync(sp), `Script module exists: ${s}`);
});

console.log('\n=======================================');
console.log(`Verification Summary: ${passes} Passed, ${errors} Failed`);
if (errors > 0) {
  process.exit(1);
} else {
  console.log('ALL CHECKS PASSED SUCCESSFULLY!');
  process.exit(0);
}
