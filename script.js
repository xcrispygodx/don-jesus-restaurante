// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== MENU TABS =====
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    menuCategories.forEach(cat => {
      if (cat.dataset.category === target) {
        cat.classList.remove('hidden');
      } else {
        cat.classList.add('hidden');
      }
    });
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNav);

// ===== FADE IN ON SCROLL =====
const fadeElements = document.querySelectorAll('.menu-card, .review-card, .feature, .info-item, .gallery-item');

fadeElements.forEach(el => el.classList.add('fade-in'));

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));
