/**
 * Summit Motors - Main Application Interactions
 */

export function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

export function openTestDriveModal(carName = '') {
  const modal = document.getElementById('test-drive-modal');
  const carInput = document.getElementById('modal-car-select');
  if (!modal) return;

  if (carInput && carName) {
    carInput.value = carName;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeTestDriveModal() {
  const modal = document.getElementById('test-drive-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

export function initGlobalUI() {
  // Mobile Nav Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open', willOpen);
      mobileToggle.classList.toggle('active', willOpen);
      mobileToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      document.body.style.overflow = willOpen ? 'hidden' : '';
    });

    // Close when tapping any link inside drawer
    mobileDrawer.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close when tapping outside drawer
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeDrawer();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Close on window resize above mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close siblings
        faqItems.forEach(sibling => sibling.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Test Drive Modal Triggers & Event Delegation
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-book-drive');
    if (btn) {
      const carName = btn.getAttribute('data-car-name') || '';
      openTestDriveModal(carName);
    }

    if (e.target.matches('.modal-overlay') || e.target.closest('.modal-close')) {
      closeTestDriveModal();
    }
  });

  // Test Drive Modal Form Submission
  const testDriveForm = document.getElementById('test-drive-form');
  if (testDriveForm) {
    testDriveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const car = document.getElementById('modal-car-select')?.value || 'Selected Vehicle';
      const name = document.getElementById('modal-name')?.value || 'Valued Customer';
      closeTestDriveModal();
      showToast(`Thank you ${name}! Your test drive for the ${car} is booked.`);
      testDriveForm.reset();
    });
  }

  // Generic Contact & Valuation Form Handlers
  const valuationForm = document.getElementById('valuation-form');
  if (valuationForm) {
    valuationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Valuation request received! A forecourt specialist will contact you in under 15 mins.');
      valuationForm.reset();
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been sent to our forecourt team.');
      contactForm.reset();
    });
  }
}
