  // ── Mobile menu ──────────────────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-close');

  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });

  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Testimonial slider ────────────────────────────────────────
  const slides   = document.getElementById('testimonial-slides');
  const dots     = document.querySelectorAll('.slider-dot');
  let current    = 0;
  let autoTimer;

  function goTo(index) {
    current = index;
    slides.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', i === current);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(autoTimer);
      goTo(Number(dot.dataset.slide));
      startAuto();
    });
  });

  function startAuto() {
    autoTimer = setInterval(() => {
      goTo((current + 1) % dots.length);
    }, 5000);
  }

  startAuto();

  // Touch/swipe for testimonials
  let touchStartX = 0;
  slides.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slides.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      clearInterval(autoTimer);
      goTo(diff > 0 ? Math.min(current + 1, dots.length - 1) : Math.max(current - 1, 0));
      startAuto();
    }
  });

  // ── Scroll reveal ─────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // ── Sticky nav color on scroll ────────────────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 80
      ? 'rgba(255,255,255,0.97)'
      : 'rgba(255,255,255,0.85)';
  });
