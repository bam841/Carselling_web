/**
 * Summit Motors - Vehicle Inventory Engine
 */

let cachedCars = null;

export async function fetchCars() {
  if (cachedCars) return cachedCars;
  try {
    const response = await fetch('./data/cars-sample.json');
    if (!response.ok) throw new Error('Failed to load vehicle database');
    cachedCars = await response.json();
    return cachedCars;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(val) {
  return new Intl.NumberFormat('en-US').format(val);
}

export function createCarCardHTML(car) {
  return `
    <article class="car-card" data-id="${car.id}">
      <div class="car-card-img-wrapper">
        <img class="car-card-img" src="${car.image}" alt="${car.name}" loading="lazy" />
        <span class="car-card-badge">${car.year} • ${car.bodyStyle}</span>
      </div>
      <div class="car-card-body">
        <h3 class="car-card-title">${car.name}</h3>
        <div class="car-card-price-row">
          <span class="car-card-price">${formatCurrency(car.price)}</span>
          <span class="car-card-monthly">Est. $${car.monthlyEstimate || Math.round(car.price / 60)}/mo</span>
        </div>
        <div class="car-card-specs">
          <div class="spec-item">
            <span class="spec-label">Mileage</span>
            <span class="spec-val">${formatNumber(car.mileage)} mi</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Fuel</span>
            <span class="spec-val">${car.fuelType}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Gearbox</span>
            <span class="spec-val">${car.transmission}</span>
          </div>
        </div>
        <div class="car-card-footer">
          <a href="car-detail.html?id=${car.id}" class="btn btn-secondary btn-sm" style="flex: 1;">View Details</a>
          <button class="btn btn-primary btn-sm btn-book-drive" data-car-name="${car.name}">Test Drive</button>
        </div>
      </div>
    </article>
  `;
}

export async function renderFeaturedCars(containerId = 'featured-cars-grid', limit = 4) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cars = await fetchCars();
  const featured = cars.filter(c => c.featured).slice(0, limit);
  const itemsToRender = featured.length ? featured : cars.slice(0, limit);

  container.innerHTML = itemsToRender.map(createCarCardHTML).join('');
}

export async function initInventoryPage() {
  const container = document.getElementById('inventory-grid');
  const countDisplay = document.getElementById('cars-count');
  const searchInput = document.getElementById('search-input');
  const makeFilter = document.getElementById('make-filter');
  const bodyFilter = document.getElementById('body-filter');
  const fuelFilter = document.getElementById('fuel-filter');
  const sortSelect = document.getElementById('sort-select');
  const resetBtn = document.getElementById('reset-filters-btn');

  if (!container) return;

  const allCars = await fetchCars();

  // Populate dynamic makes dropdown if empty
  if (makeFilter && makeFilter.options.length <= 1) {
    const makes = Array.from(new Set(allCars.map(c => c.make))).sort();
    makes.forEach(make => {
      const opt = document.createElement('option');
      opt.value = make;
      opt.textContent = make;
      makeFilter.appendChild(opt);
    });
  }

  function applyFilters() {
    let results = [...allCars];

    const query = (searchInput?.value || '').trim().toLowerCase();
    if (query) {
      results = results.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.make.toLowerCase().includes(query) ||
        c.model.toLowerCase().includes(query) ||
        c.exteriorColor.toLowerCase().includes(query)
      );
    }

    const selectedMake = makeFilter?.value;
    if (selectedMake && selectedMake !== 'all') {
      results = results.filter(c => c.make.toLowerCase() === selectedMake.toLowerCase());
    }

    const selectedBody = bodyFilter?.value;
    if (selectedBody && selectedBody !== 'all') {
      results = results.filter(c => c.bodyStyle.toLowerCase() === selectedBody.toLowerCase());
    }

    const selectedFuel = fuelFilter?.value;
    if (selectedFuel && selectedFuel !== 'all') {
      results = results.filter(c => c.fuelType.toLowerCase() === selectedFuel.toLowerCase());
    }

    const sortBy = sortSelect?.value || 'featured';
    if (sortBy === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'mileage-asc') {
      results.sort((a, b) => a.mileage - b.mileage);
    } else if (sortBy === 'year-desc') {
      results.sort((a, b) => b.year - a.year);
    }

    if (countDisplay) {
      countDisplay.textContent = `Showing ${results.length} vehicle${results.length === 1 ? '' : 's'}`;
    }

    if (results.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">No vehicles found</h3>
          <p style="color: var(--color-neutral-medium); margin-bottom: 1.5rem;">Try adjusting your filters or search keywords.</p>
          <button id="empty-reset-btn" class="btn btn-secondary">Reset All Filters</button>
        </div>
      `;
      document.getElementById('empty-reset-btn')?.addEventListener('click', resetFilters);
    } else {
      container.innerHTML = results.map(createCarCardHTML).join('');
    }
  }

  function resetFilters() {
    if (searchInput) searchInput.value = '';
    if (makeFilter) makeFilter.value = 'all';
    if (bodyFilter) bodyFilter.value = 'all';
    if (fuelFilter) fuelFilter.value = 'all';
    if (sortSelect) sortSelect.value = 'featured';
    applyFilters();
  }

  [searchInput, makeFilter, bodyFilter, fuelFilter, sortSelect].forEach(el => {
    el?.addEventListener('input', applyFilters);
    el?.addEventListener('change', applyFilters);
  });

  resetBtn?.addEventListener('click', resetFilters);

  applyFilters();
}
