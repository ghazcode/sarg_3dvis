document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('[data-slider]');
  sliders.forEach(slider => {
    const slides = slider.querySelector('.portfolio__slides');
    const prevBtn = slider.querySelector('.portfolio__arrow--prev');
    const nextBtn = slider.querySelector('.portfolio__arrow--next');
    
    if (slides && prevBtn && nextBtn) {
      let current = 0;
      const total = slides.children.length;
      
      function showSlide(n) {
        // МГНОВЕННАЯ смена БЕЗ анимации
        slides.style.transition = 'none';
        slides.style.transform = `translateX(-${n * 100}%)`;
      }
      
      prevBtn.addEventListener('click', () => {
        current = current > 0 ? current - 1 : total - 1;
        showSlide(current);
      });
      
      nextBtn.addEventListener('click', () => {
        current = current < total - 1 ? current + 1 : 0;
        showSlide(current);
      });
      
      showSlide(0);
    }
  });
});
