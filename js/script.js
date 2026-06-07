document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  /* ── Mobile menu ── */
  const btn  = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  const links = menu.querySelectorAll('[data-mobile-link]');

  function openMenu(){
    btn.classList.add('is-open');
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded','true');
    document.body.classList.add('no-scroll');
  }
  function closeMenu(){
    btn.classList.remove('is-open');
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
    document.body.classList.remove('no-scroll');
  }
  function toggleMenu(e){
    if(e) e.preventDefault();
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
  }

  if (btn) {
    btn.addEventListener('click', toggleMenu);
  }

  links.forEach(function(link){
    link.addEventListener('click', closeMenu);
  });

  /* ── Scroll logic ── */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── Scroll reveal ── */
  const revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:0.05, rootMargin:'0px 0px -20px 0px'});

  document.querySelectorAll('.reveal').forEach(function(el){
    revealObserver.observe(el);
  });

  /* ── Stats Number Counter ── */
  const statNumbers = document.querySelectorAll('.stat-num');
  const animationDuration = 2000; 

  const animateValue = (obj, start, end, duration) => {
      let startTimestamp = null;
      const originalText = obj.innerHTML;
      const prefixMatch = originalText.match(/^[^0-9]+/);
      const suffixMatch = originalText.match(/[^0-9]+$/);
      const prefix = prefixMatch ? prefixMatch[0] : '';
      const suffix = suffixMatch ? suffixMatch[0] : '';

      const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const currentValue = Math.floor(progress * (end - start) + start);
          obj.innerHTML = prefix + currentValue + suffix;
          
          if (progress < 1) {
              window.requestAnimationFrame(step);
          } else {
              obj.innerHTML = prefix + end + suffix; 
          }
      };
      window.requestAnimationFrame(step);
  };

  const statObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const target = entry.target;
              const text = target.innerText;
              const endValue = parseInt(text.replace(/[^0-9]/g, ''), 10);
              
              if (!isNaN(endValue)) {
                  animateValue(target, 0, endValue, animationDuration);
              }
              obs.unobserve(target);
          }
      });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => { statObserver.observe(stat); });

  /* ── Spotlight Effect ── */
  const spotlightContainer = document.getElementById("spotlight-container");
  if(spotlightContainer) {
    spotlightContainer.addEventListener("mousemove", e => {
      for(const card of document.querySelectorAll(".service-card")) {
        const rect = card.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    });
  }

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-item').forEach(function(item){
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', function(){
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function(otherItem){
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      if(!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 40 + "px"; 
      }
    });
  });

});
