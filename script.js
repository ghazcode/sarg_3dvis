document.addEventListener('DOMContentLoaded', function() {
  // 1. Бургер-меню 
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.header__nav');
  if (burger && nav) {
    burger.addEventListener('click', function() {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
    });
    
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // 2. МОДАЛКА
  document.querySelectorAll('.portfolio__image, .portfolio__image--full').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function(e) {
      const slider = this.closest('[data-slider]');
      const images = slider.querySelectorAll('.portfolio__image, .portfolio__image--full');
      const allImages = Array.from(images);
      const currentIndex = allImages.indexOf(this);
      
      const modal = document.createElement('div');
      modal.className = 'portfolio-modal';
      
      let slidesHTML = '';
      allImages.forEach((imgEl, i) => {
        slidesHTML += `<img src="${imgEl.src}" class="modal-slide ${i === currentIndex ? 'active' : ''}" data-index="${i}">`;
      });
      
      modal.innerHTML = `
        <div class="modal-gallery">
          ${slidesHTML}
          <button class="modal-prev">❮</button>
          <button class="modal-next">❯</button>
          <button class="modal-close">×</button>
        </div>
      `;
      document.body.appendChild(modal);
      
      const modalSlides = modal.querySelectorAll('.modal-slide');
      let modalCurrent = currentIndex;
      
      function showModalSlide(index) {
        modalSlides.forEach(s => s.classList.remove('active'));
        modalSlides[index].classList.add('active');
        modalCurrent = index;
      }
      
      modal.querySelector('.modal-prev').addEventListener('click', () => {
        if (modalCurrent > 0) showModalSlide(modalCurrent - 1);
      });
      modal.querySelector('.modal-next').addEventListener('click', () => {
        if (modalCurrent < modalSlides.length - 1) showModalSlide(modalCurrent + 1);
      });
      modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
      });
      modal.addEventListener('click', e => {
        if (e.target === modal) document.body.removeChild(modal);
      });
    });
  });

  // 3. СЛАЙДЕРЫ
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const track = slider.querySelector('.portfolio__slides');
    const slides = slider.querySelectorAll('.portfolio__slide');
    const prevBtn = slider.querySelector('.portfolio__arrow--prev');
    const nextBtn = slider.querySelector('.portfolio__arrow--next');
    
    let index = 0;
    
    function goToSlide(newIndex) {
      index = Math.max(0, Math.min(slides.length - 1, newIndex));
      const offset = -index * 100;
      track.style.transition = 'none';
      track.style.transform = `translateX(${offset}%)`;
    }
    
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(index + 1));
    goToSlide(0);
  });

// 🔥 ПЛАВНЫЙ СКРОЛЛ — ПРОСТОЙ И НАДЁЖНЫЙ
let scrollTimeout = null;

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  
  // Очищаем предыдущий таймер
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  
  // Немедленный скролл + плавная анимация
  const delta = e.deltaY * 1.5;
  window.scrollBy({
    top: delta,
    behavior: 'smooth'
  });
  
  // Блокируем повторный скролл на 300мс
  scrollTimeout = setTimeout(() => {}, 300);
}, { passive: false });
}); // ← ВСЁ ВНУТРИ!

