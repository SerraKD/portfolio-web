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
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 }) : null;

    if (io) {
        $$('.fade').forEach(el => io.observe(el));
    } else {
        $$('.fade').forEach(el => el.classList.add('in'));
    }

    // Set current year in footer
    const year = new Date().getFullYear();
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = year;

    // Smooth scrolling focus management for skip link targets
    $$('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            const target = id && $(id);
            if (!target) return;
            // allow default scroll, then manage focus
            setTimeout(() => target.setAttribute('tabindex', '-1'), 0);
        });
    });
})();