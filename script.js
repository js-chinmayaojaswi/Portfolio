// ==========================================================================
// Clean Minimal Light Portfolio - Interactive Logic
// J S Chinmaya Ojaswi - CSE @ Malnad College of Engineering, Hassan
// ==========================================================================

const CHINMAYA_EMAIL = 'js.c.ojaswi01@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // 2. Set current year in footer
  const yearSpan = document.getElementById('year-span');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Initialize Mobile Menu Drawer Toggle
  initMobileMenu();

  // 4. Initialize One-Click Email Copy Buttons
  initCopyEmailButtons();

  // 5. Initialize Lightbox interactions
  initLightbox();

  // 6. Header scroll styling
  initHeaderScroll();
});

// --------------------------------------------------------------------------
// Mobile Menu Navigation Drawer
// --------------------------------------------------------------------------
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const menu = document.getElementById('mobile-menu');

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Close menu when clicking any mobile anchor
  const mobileLinks = menu.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// --------------------------------------------------------------------------
// Copy Email to Clipboard with Toast Notification
// --------------------------------------------------------------------------
function initCopyEmailButtons() {
  const copyButtons = [
    document.getElementById('nav-copy-email-btn'),
    document.getElementById('copy-email-bottom-btn')
  ];

  copyButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      copyEmailToClipboard();
    });
  });
}

function copyEmailToClipboard() {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(CHINMAYA_EMAIL)
      .then(() => showToast('Email copied to clipboard!'))
      .catch(() => fallbackCopyText(CHINMAYA_EMAIL));
  } else {
    fallbackCopyText(CHINMAYA_EMAIL);
  }
}

function fallbackCopyText(text) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (successful) {
      showToast('Email copied to clipboard!');
    } else {
      showToast('Please email: ' + CHINMAYA_EMAIL);
    }
  } catch (err) {
    showToast('Please email: ' + CHINMAYA_EMAIL);
  }
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('hidden');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2600);
}

// --------------------------------------------------------------------------
// Lightbox Modal for Certificate Viewing
// --------------------------------------------------------------------------
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  // Click backdrop outside modal content to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // ESC key listener to close lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

// Global functions exposed for inline onclick handlers in index.html
window.openLightbox = function(src, caption) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');

  if (!lightbox || !img) return;

  img.src = src;
  if (cap) cap.innerHTML = caption || '';

  lightbox.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
};

window.closeLightbox = function() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightbox.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');

  const img = document.getElementById('lightbox-img');
  if (img) img.src = '';
};

// --------------------------------------------------------------------------
// Header Shadow Effect on Scroll
// --------------------------------------------------------------------------
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 16) {
      header.classList.add('shadow-xs');
    } else {
      header.classList.remove('shadow-xs');
    }
  }, { passive: true });
}
