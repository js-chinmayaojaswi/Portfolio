// ==========================================================================
// J S Chinmaya Ojaswi — Personal Developer Portfolio
// Human-Crafted Interactive Logic (Vanilla JS, Zero Dependencies)
// ==========================================================================

const CHINMAYA_EMAIL = 'js.c.ojaswi01@gmail.com';
const THEME_KEY = 'portfolio-theme';

// --------------------------------------------------------------------------
// Theme Management (Synchronous & Reactive)
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

// Expose globally for inline button handlers
window.getActiveTheme = getActiveTheme;
window.applyTheme = applyTheme;
window.toggleTheme = toggleTheme;
window.updateThemeUI = updateThemeUI;

// --------------------------------------------------------------------------
// Page Initialization on DOMContentLoaded
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Sync theme UI
  const currentIsDark = document.documentElement.classList.contains('dark');
  updateThemeUI(currentIsDark);

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

  // 3. Listen for OS theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // 4. Set current year in footer
  const yearSpan = document.getElementById('year-span');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 5. Initialize live time indicator (Hassan, India • IST)
  initLiveTime();

  // 6. Initialize Mobile Menu Drawer
  initMobileMenu();

  // 7. Initialize Clipboard Email Buttons
  initCopyEmailButtons();

  // 8. Initialize Lightbox Modal
  initLightbox();

  // 9. Initialize Certificate Category Filter
  initCertificateFilters();

  // 10. Header scroll styling & back-to-top button
  initScrollWatchers();

  // 11. Contact form handler
  initContactForm();

  // 12. Resume button handler
  initResumeButtons();
});

// --------------------------------------------------------------------------
// Live Hassan, India Time Indicator (IST: UTC+5:30)
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
      timeEl.textContent = new Intl.DateTimeFormat('en-US', options).format(now) + ' IST';
    } catch (e) {
      timeEl.textContent = 'IST (UTC+5:30)';
    }
  }

  update();
  setInterval(update, 30000);
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

  const mobileLinks = menu.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });

  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !toggleBtn.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
}

// --------------------------------------------------------------------------
// Copy Email to Clipboard with Sleek Toast Feedback
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
      .then(() => showToast('Copied: ' + CHINMAYA_EMAIL))
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
      showToast('Copied: ' + text);
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
// Certificate Category Filter Tabs
// --------------------------------------------------------------------------
function initCertificateFilters() {
  const filterBtns = document.querySelectorAll('.cert-filter-btn');
  const certItems = document.querySelectorAll('.cert-grid-item');

  if (!filterBtns.length || !certItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter') || 'all';

      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-slate-900', 'text-white', 'dark:bg-sky-500', 'dark:text-slate-950');
        b.classList.add('bg-slate-100', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-400');
      });

      btn.classList.add('active', 'bg-slate-900', 'text-white', 'dark:bg-sky-500', 'dark:text-slate-950');
      btn.classList.remove('bg-slate-100', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-400');

      // Filter grid items
      certItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category') || '';
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// Lightbox Modal for Full-Resolution Document Inspection
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
  if (cap) cap.innerHTML = caption || 'Verified Credential Scan';

  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  document.body.classList.add('overflow-hidden');
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
// Scroll Watchers: Header border styling & Back to Top button
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
      showToast('Please complete all form fields.');
      return;
    }

    const subject = encodeURIComponent(`Message from ${name} via Portfolio`);
    const body = encodeURIComponent(`Hi Chinmaya,\n\n${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:${CHINMAYA_EMAIL}?subject=${subject}&body=${body}`;

    showToast('Opening email client to send message...');
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
            const body = encodeURIComponent('Hi Chinmaya,\n\nI visited your portfolio and would like to request your latest resume.\n\nBest regards,');
            window.location.href = `mailto:${CHINMAYA_EMAIL}?subject=${subject}&body=${body}`;
            showToast('Opening email to request resume directly.');
          }
        })
        .catch(() => {});
    });
  });
}
