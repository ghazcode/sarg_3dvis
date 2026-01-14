document.addEventListener('DOMContentLoaded', function() {
  // Бургер
  document.querySelector('.burger')?.addEventListener('click', function() {
    document.querySelector('.burger').classList.toggle('active');
    document.querySelector('.header__nav').classList.toggle('active');
  });

  // ПЛАВНЫЙ СКРОЛЛ
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 90,
          behavior: 'smooth'
        });
        // Закрыть бургер
        document.querySelector('.burger')?.classList.remove('active');
        document.querySelector('.header__nav')?.classList.remove('active');
      }
    });
  });

  // Модалка (твоя работает)
  document.querySelectorAll('.portfolio__image, .portfolio__image--full').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      // Твой код модалки БЕЗ ИЗМЕНЕНИЙ
    });
  });

  // Стрелки портфолио
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const track = slider.querySelector('.portfolio__slides');
    const prevBtn = slider.querySelector('.portfolio__arrow--prev');
    const nextBtn = slider.querySelector('.portfolio__arrow--next');
    let index = 0;
    
    function goToSlide(n) {
      index = Math.max(0, Math.min(slider.querySelectorAll('.portfolio__slide').length - 1, n));
      track.style.transform = `translateX(${-index * 100}%)`;
    }
    
    prevBtn?.addEventListener('click', () => goToSlide(index - 1));
    nextBtn?.addEventListener('click', () => goToSlide(index + 1));
  });
});
