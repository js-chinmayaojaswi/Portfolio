// ==========================================================================
// Clean Minimal Modern Developer Portfolio - Interactive Logic
// Theme: Bulletproof Dark & Light Mode Switcher + Recruiter-Ready UX
// J S Chinmaya Ojaswi - CSE @ Malnad College of Engineering, Hassan
// ==========================================================================

const CHINMAYA_EMAIL = 'js.c.ojaswi01@gmail.com';
const THEME_KEY = 'portfolio-theme';

// --------------------------------------------------------------------------
// Core Theme Functions (Callable anytime)
// --------------------------------------------------------------------------
function getActiveTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(themeName) {
  const isDark = themeName === 'dark';
  const html = document.documentElement;

  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  localStorage.setItem(THEME_KEY, themeName);

  // Sync all theme icons and text across desktop & mobile
  const sunIcons = document.querySelectorAll('.theme-sun-icon');
  const moonIcons = document.querySelectorAll('.theme-moon-icon');
  const themeLabels = document.querySelectorAll('.theme-label-text');
  const mobileThemeIcons = document.querySelectorAll('.mobile-theme-icon');
  const mobileThemeTexts = document.querySelectorAll('.mobile-theme-text');

  sunIcons.forEach(el => {
    if (isDark) el.classList.remove('hidden');
    else el.classList.add('hidden');
  });

  moonIcons.forEach(el => {
    if (isDark) el.classList.add('hidden');
    else el.classList.remove('hidden');
  });

  themeLabels.forEach(el => {
    el.textContent = isDark ? 'Light' : 'Dark';
  });

  mobileThemeIcons.forEach(el => {
    el.textContent = isDark ? '☀️' : '🌙';
  });

  mobileThemeTexts.forEach(el => {
    el.textContent = isDark ? 'Switch to Light' : 'Switch to Dark';
  });
}

function toggleTheme() {
  const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

// --------------------------------------------------------------------------
// Page Initialization on DOMContentLoaded
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme Switcher State
  const initialTheme = getActiveTheme();
  applyTheme(initialTheme);

  // 2. Attach Click Listeners to Theme Toggle Buttons
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });
  }

  const mobileToggleBtn = document.getElementById('mobile-theme-toggle-btn');
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });
  }

  // Listen for OS system theme changes (if user hasn't chosen manually)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 3. Initialize Lucide Icons
  renderIcons();

  // 4. Set current year in footer
  const yearSpan = document.getElementById('year-span');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 5. Initialize Mobile Menu Drawer
  initMobileMenu();

  // 6. Initialize Clipboard Email Buttons
  initCopyEmailButtons();

  // 7. Initialize Lightbox
  initLightbox();

  // 8. Header scroll styling & back-to-top button
  initScrollWatchers();

  // 9. Contact form handler
  initContactForm();

  // 10. Resume button handler
  initResumeButtons();
});

// --------------------------------------------------------------------------
// Helper: Lucide Icons refresh
// --------------------------------------------------------------------------
function renderIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// --------------------------------------------------------------------------
// Mobile Menu Navigation Drawer
// --------------------------------------------------------------------------
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const menu = document.getElementById('mobile-menu');

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
  });

  // Close menu when clicking any mobile anchor
  const mobileLinks = menu.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !toggleBtn.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
}

// --------------------------------------------------------------------------
// Copy Email to Clipboard with Toast Notification
// --------------------------------------------------------------------------
function initCopyEmailButtons() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      copyEmailToClipboard();
    });
  });
}

function copyEmailToClipboard() {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(CHINMAYA_EMAIL)
      .then(() => showToast('Email copied: ' + CHINMAYA_EMAIL))
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
      showToast('Email copied: ' + text);
    } else {
      showToast('Email address: ' + text);
    }
  } catch (err) {
    showToast('Email address: ' + text);
  }
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('flex');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 2800);
}

// --------------------------------------------------------------------------
// Lightbox Modal for Full-Resolution Image Inspection
// --------------------------------------------------------------------------
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

window.openLightbox = function(src, caption) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');

  if (!lightbox || !img) return;

  img.src = src;
  if (cap) cap.innerHTML = caption || '';

  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  document.body.classList.add('overflow-hidden');

  renderIcons();
};

window.closeLightbox = function() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');

  const img = document.getElementById('lightbox-img');
  if (img) img.src = '';
};

// --------------------------------------------------------------------------
// Scroll Watchers: Header Shadow & Floating Back to Top Button
// --------------------------------------------------------------------------
function initScrollWatchers() {
  const header = document.querySelector('header');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 20) {
        header.classList.add('shadow-sm', 'backdrop-blur-md');
      } else {
        header.classList.remove('shadow-sm', 'backdrop-blur-md');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// --------------------------------------------------------------------------
// Contact Form Handler
// --------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showToast('Please fill out all fields.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Chinmaya,\n\n${message}\n\nBest regards,\n${name}\n${email}`);
    window.location.href = `mailto:${CHINMAYA_EMAIL}?subject=${subject}&body=${body}`;

    showToast('Opening your email client to send message...');
    form.reset();
  });
}

// --------------------------------------------------------------------------
// Resume Download / Request Handler
// --------------------------------------------------------------------------
function initResumeButtons() {
  const resumeButtons = document.querySelectorAll('.resume-btn');
  resumeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      fetch('./resume.pdf', { method: 'HEAD' })
        .then(res => {
          if (!res.ok) {
            e.preventDefault();
            const subject = encodeURIComponent('Resume Request — J S Chinmaya Ojaswi');
            const body = encodeURIComponent('Hi Chinmaya,\n\nI reviewed your portfolio and would like to request a copy of your latest resume for upcoming opportunities.\n\nBest regards,');
            window.location.href = `mailto:${CHINMAYA_EMAIL}?subject=${subject}&body=${body}`;
            showToast('Opening email to request latest resume PDF directly!');
          }
        })
        .catch(() => {});
    });
  });
}
