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

    // Auto-close mobile nav on link click
    $$('#nav a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
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

  // Highlight active nav link on scroll
  const sections = $$('main section[id]');
  const navLinks = $$('#nav a');

  function setActiveLink() {
    let current = '';
    const scrollY = window.scrollY + 100; // offset for header

    sections.forEach((section) => {
      if (
        scrollY >= section.offsetTop &&
        scrollY < section.offsetTop + section.offsetHeight
      ) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (current && link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // run on load
})();