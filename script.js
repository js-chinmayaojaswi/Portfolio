// ==========================================================================
// J S Chinmaya Ojaswi — Personal Developer Portfolio
// Robust, Production-Grade Interactive Logic (Vanilla JS)
// ==========================================================================

const CHINMAYA_EMAIL = 'js.c.ojaswi01@gmail.com';
const THEME_KEY = 'portfolio-theme';

// --------------------------------------------------------------------------
// 1. Theme Management (Zero-FOUC & Reactive)
// --------------------------------------------------------------------------
function getActiveTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateThemeUI(isDark) {
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

function applyTheme(themeName) {
  const isDark = themeName === 'dark';
  const html = document.documentElement;

  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  try {
    localStorage.setItem(THEME_KEY, themeName);
  } catch (e) {}

  updateThemeUI(isDark);
}

function toggleTheme() {
  const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

// Expose globally
window.getActiveTheme = getActiveTheme;
window.applyTheme = applyTheme;
window.toggleTheme = toggleTheme;
window.updateThemeUI = updateThemeUI;

// --------------------------------------------------------------------------
// 2. Lifecycle Initialization on DOMContentLoaded
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Sync UI state with current theme
  const currentIsDark = document.documentElement.classList.contains('dark');
  updateThemeUI(currentIsDark);

  // Theme Toggle Button Listeners (Single unified event binding)
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

  // Listen for OS system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Set current year in footer
  const yearSpan = document.getElementById('year-span');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Initialize interactive components
  initLiveTime();
  initMobileMenu();
  initCopyEmailButtons();
  initLightbox();
  initCertificateFilters();
  initScrollWatchers();
  initContactForm();
  initResumeButtons();
});

// --------------------------------------------------------------------------
// 3. Live Hassan, India Time Indicator (IST: UTC+5:30)
// --------------------------------------------------------------------------
function initLiveTime() {
  const timeEl = document.getElementById('local-time-indicator');
  if (!timeEl) return;

  function update() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
      timeEl.textContent = `${timeStr} IST • Hassan, Karnataka`;
    } catch (e) {
      timeEl.textContent = 'Hassan, Karnataka (IST)';
    }
  }

  update();
  setInterval(update, 30000);
}

// --------------------------------------------------------------------------
// 4. Mobile Menu Navigation Drawer (Accessible & Keyboard Safe)
// --------------------------------------------------------------------------
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const menu = document.getElementById('mobile-menu');

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
      menu.classList.remove('hidden');
      toggleBtn.setAttribute('aria-expanded', 'true');
    } else {
      menu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  const mobileLinks = menu.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !toggleBtn.contains(e.target)) {
      menu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// --------------------------------------------------------------------------
// 5. Copy Email to Clipboard with Accessible Toast Feedback
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
      showToast(text);
    }
  } catch (err) {
    showToast(text);
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
  }, 2600);
}

// --------------------------------------------------------------------------
// 6. Certificate Category Filter Tabs (Zero CSS Specificity Conflicts)
// --------------------------------------------------------------------------
function initCertificateFilters() {
  const filterBtns = document.querySelectorAll('.cert-filter-btn');
  const certItems = document.querySelectorAll('.cert-grid-item');

  if (!filterBtns.length || !certItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter') || 'all';

      // Update active state on buttons
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-slate-900', 'text-white', 'dark:bg-sky-500', 'dark:text-slate-950');
        b.classList.add('bg-slate-100', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-400');
      });

      btn.classList.add('active', 'bg-slate-900', 'text-white', 'dark:bg-sky-500', 'dark:text-slate-950');
      btn.classList.remove('bg-slate-100', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-400');

      // Filter grid items directly via display style
      certItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category') || '';
        if (category === 'all' || itemCategory === category) {
          item.style.display = 'flex';
          item.classList.remove('hidden');
        } else {
          item.style.display = 'none';
          item.classList.add('hidden');
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// 7. Lightbox Modal for Full-Resolution Document Inspection (WCAG Accessible)
// --------------------------------------------------------------------------
let lastFocusedElement = null;

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

  lastFocusedElement = document.activeElement;
  img.src = src;
  if (cap) cap.innerHTML = caption || 'Verified Credential Scan';

  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  document.body.classList.add('overflow-hidden');

  // Focus close button inside modal
  const closeBtn = lightbox.querySelector('button[aria-label="Close modal"]');
  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 50);
  }
};

window.closeLightbox = function() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');

  const img = document.getElementById('lightbox-img');
  if (img) img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
};

// --------------------------------------------------------------------------
// 8. Scroll Watchers: Header border styling & Back to Top button
// --------------------------------------------------------------------------
function initScrollWatchers() {
  const header = document.querySelector('header');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 20) {
        header.classList.add('shadow-xs');
      } else {
        header.classList.remove('shadow-xs');
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
// 9. Contact Form Handler (Safe Mailto Dispatch with Email Regex Validation)
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
      showToast('Please complete all form fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.');
      if (emailInput) emailInput.focus();
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Chinmaya,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
    
    // Create temporary link to dispatch mailto reliably
    const mailtoLink = document.createElement('a');
    mailtoLink.href = `mailto:${CHINMAYA_EMAIL}?subject=${subject}&body=${body}`;
    mailtoLink.target = '_blank';
    mailtoLink.rel = 'noopener noreferrer';
    document.body.appendChild(mailtoLink);
    mailtoLink.click();
    document.body.removeChild(mailtoLink);

    showToast('Opening your email client to send message...');
    form.reset();
  });
}

// --------------------------------------------------------------------------
// 10. Resume Download Feedback
// --------------------------------------------------------------------------
function initResumeButtons() {
  const resumeButtons = document.querySelectorAll('.resume-btn');
  resumeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Downloading Chinmaya Ojaswi Resume PDF...');
    });
  });
}
