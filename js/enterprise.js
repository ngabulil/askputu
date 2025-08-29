const swiper = new Swiper(".swiper", {
  spaceBetween: 0,
  speed: 5000,
  direction: "horizontal",
  autoplay: { delay: 0, disableOnInteraction: false },
  loop: true,
  freeMode: true,
  breakpoints: {
    300: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
  },
});
