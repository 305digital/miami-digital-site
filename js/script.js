// Sticky header shadow on scroll
const header = document.getElementById('site-header');
const backToTop = document.getElementById('back-to-top');

function onScroll() {
  const scrolled = window.scrollY > 8;
  header.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => io.observe(el));

// Contact form: front-end only success state (no backend wired up yet)
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  success.hidden = false;
  form.reset();
});
