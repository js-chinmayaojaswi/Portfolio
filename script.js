// ==========================================================================
// Clean Minimal Modern Developer Portfolio - Interactive Logic
// Theme: Full Dark & Light Mode Toggle + Recruiter-Ready UX
// J S Chinmaya Ojaswi - CSE @ Malnad College of Engineering, Hassan
// ==========================================================================

const CHINMAYA_EMAIL = 'js.c.ojaswi01@gmail.com';
const THEME_KEY = 'portfolio-theme';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme Switcher (Dark / Light)
  initThemeToggle();

  // 2. Initialize Lucide Icons
  renderIcons();

  // 3. Set current year in footer
  const yearSpan = document.getElementById('year-span');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 4. Initialize Mobile Menu Drawer
  initMobileMenu();

  // 5. Initialize Clipboard Email Buttons
  initCopyEmailButtons();

  // 6. Initialize Certificate & Project Lightbox
  initLightbox();

  // 7. Header scroll styling & back-to-top button
  initScrollWatchers();

  // 8. Contact form submission handler
  initContactForm();

  // 9. Resume button handler
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
// Theme Toggle: Dark Mode & Light Mode
// --------------------------------------------------------------------------
function initThemeToggle() {
  const toggleBtns = [
    document.getElementById('theme-toggle-btn'),
    document.getElementById('mobile-theme-toggle-btn')
  ].filter(Boolean);

  // Sync initial icons with active theme
  updateThemeIcons();

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isDark = document.documentElement.classList.contains('dark');
      const nextTheme = isDark ? 'light' : 'dark';

      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      localStorage.setItem(THEME_KEY, nextTheme);
      updateThemeIcons();
    });
  });

  // Listen for OS system theme changes (if user hasn't explicitly set one)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      updateThemeIcons();
    }
  });
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const sunIcons = document.querySelectorAll('.theme-sun-icon');
  const moonIcons = document.querySelectorAll('.theme-moon-icon');
  const themeLabels = document.querySelectorAll('.theme-label-text');

  sunIcons.forEach(icon => {
    if (isDark) {
      icon.classList.remove('hidden');
    } else {
      icon.classList.add('hidden');
    }
  });

  moonIcons.forEach(icon => {
    if (isDark) {
      icon.classList.add('hidden');
    } else {
      icon.classList.remove('hidden');
    }
  });

  themeLabels.forEach(lbl => {
    lbl.textContent = isDark ? 'Light' : 'Dark';
  });

  renderIcons();
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

// Exposed globally for inline onclick attributes
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

    // Header glassmorphic elevation
    if (header) {
      if (scrollY > 20) {
        header.classList.add('shadow-sm', 'backdrop-blur-md', 'bg-white/80', 'dark:bg-slate-950/80');
      } else {
        header.classList.remove('shadow-sm', 'backdrop-blur-md', 'bg-white/80', 'dark:bg-slate-950/80');
      }
    }

    // Back to top floating button visibility
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

    // Launch email client pre-filled
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
      // If resume.pdf exists, normal link works.
      // Otherwise provide a smooth prompt to request directly via email.
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
        .catch(() => {
          // Fallback if local file protocol restricts HEAD check
        });
    });
  });
}
