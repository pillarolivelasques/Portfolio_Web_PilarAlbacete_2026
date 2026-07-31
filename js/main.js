// Faz o menu hambúrguer abrir/fechar no celular
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      mainNav.classList.toggle('active');
      menuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
    });

    // Fecha o menu automaticamente ao clicar em um link
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('active');
        menuToggle.textContent = '☰';
      });
    });
  }

  // Pequenas animacoes ao rolar a pagina
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealSelectors = '.story-row, .pkg-card, .project, .cv-block, .facts-col, .express-steps > div, .about-duo img, .meet-artist, .gallery-grid img, .express-note';
  const revealEls = document.querySelectorAll(revealSelectors);

  if (revealEls.length && !prefersReducedMotion) {
    revealEls.forEach(function (el, i) {
      el.classList.add('reveal');
      // pequeno atraso escalonado para elementos lado a lado (galeria, cards)
      el.style.transitionDelay = (Math.min(i % 4, 3) * 0.08) + 's';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Mostra os campos de data/local do casamento so quando o tipo de projeto e casamento
  const projectType = document.getElementById('project-type');
  const weddingFields = document.getElementById('wedding-fields');
  if (projectType && weddingFields) {
    const toggleWeddingFields = function () {
      const showIt = projectType.value === 'Custom Wedding Suite';
      weddingFields.style.display = showIt ? 'block' : 'none';
    };
    projectType.addEventListener('change', toggleWeddingFields);
    toggleWeddingFields();
  }
});