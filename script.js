// Находим все слайдеры на странице (чтобы можно было сделать 3 блока)
const sliders = document.querySelectorAll('[data-slider]');

sliders.forEach((slider) => {
  const track = slider.querySelector('.portfolio__slides');
  const slides = slider.querySelectorAll('.portfolio__slide');
  const prevBtn = slider.querySelector('.portfolio__arrow--prev');
  const nextBtn = slider.querySelector('.portfolio__arrow--next');

  let index = 0;

  function goToSlide(i) {
    if (i < 0) {
      index = slides.length - 1;
    } else if (i >= slides.length) {
      index = 0;
    } else {
      index = i;
    }

    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(index - 1);
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(index + 1);
  });

  goToSlide(0);
});
