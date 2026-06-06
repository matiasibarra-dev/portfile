    document.addEventListener("DOMContentLoaded", () => {
      // Usamos un threshold bajo para móviles, donde el viewport es más chico
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Solo animar una vez para mejor performance
          }
        });
      }, {
        threshold: 0.05, 
        rootMargin: "0px 0px -50px 0px"
      });

      document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
      });
    });
