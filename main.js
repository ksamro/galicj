// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Set active navigation item for current subpage
const pageKey = document.body.dataset.page;
if (pageKey) {
  const currentNav = document.querySelector(`[data-nav="${pageKey}"]`);
  if (currentNav) {
    currentNav.setAttribute('aria-current', 'page');
  }
}

// Smooth scroll fallback for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// FAQ accordion (only on FAQ page)
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    if (!item) return;

    const isOpen = item.classList.contains('open');

    faqQuestions.forEach((q) => {
      q.setAttribute('aria-expanded', 'false');
      q.closest('.faq-item')?.classList.remove('open');
    });

    if (!isOpen) {
      question.setAttribute('aria-expanded', 'true');
      item.classList.add('open');
    }
  });
});

// Fade-in elements on scroll
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach((el) => {
  if (!el.classList.contains('visible-on-load')) {
    observer.observe(el);
  }
});

// Footer current year
const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

// Frontend-only contact form feedback
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Dziękujemy za wiadomość! Formularz działa pokazowo i nie wysyła danych.');
    form.reset();
  });
}
