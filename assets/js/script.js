(function () {
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  // Mobile nav toggle
  const navToggle = $('.nav-toggle');
  const nav = $('#nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Intersection Observer fade-in
  const io =
    'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 })
      : null;

  if (io) {
    $$('.fade').forEach((el) => io.observe(el));
  } else {
    $$('.fade').forEach((el) => el.classList.add('in'));
  }

  // Set current year in footer
  const year = new Date().getFullYear();
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = year;

  // Smooth scrolling focus management for skip link targets
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = id && $(id);
      if (!target) return;
      setTimeout(() => target.setAttribute('tabindex', '-1'), 0);
    });
  });

  // Copy email to clipboard on click
  const emailLink = document.getElementById('email-link');
  if (emailLink && navigator.clipboard) {
    emailLink.addEventListener('click', (e) => {
      if (!e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        navigator.clipboard
          .writeText('serrakir@gmail.com')
          .then(() => alert('Email copied to clipboard!'))
          .catch(() => { });
      }
    });
  }
})();