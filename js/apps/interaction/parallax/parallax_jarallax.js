(function () {
  let page1 = document.querySelector('.wrap-parallax-1') ? true : false;
  let page2 = document.querySelector('.wrap-parallax-2') ? true : false;

  if (page1) {
    jarallax(document.querySelectorAll('.jarallax'));
  } else if (page2) {
    const swiperParallax = new Swiper('.swiper-view', {
      loop: true,
      loopedSlides: 3,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 2500,
      autoplay: {
        delay: 300
      },
    });
    const swiperParallaxCard = new Swiper('.swiper-card', {
      direction: 'vertical',
      slidesPerView: 1,
      simulateTouch: false,
      speed: 1500,
      autoplay: {
        delay: 1500,
      },
    });
    const swiperParallaxBanner = new Swiper('.swiper-banner', {
      direction: 'horizontal',
      slidesPerView: 4,
      centeredSlide: true,
      spaceBetween: 20,
      speed: 1500,
      autoplay: {
        delay: 1500
      },
      breakpoints: {
        // when window width is >= 1300px
        1300: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 1
        }
      }
    });
    swiperParallaxCard.on('slideChange', function () {
      if (swiperParallaxCard.activeIndex === 4) {
        swiperParallaxCard.params.autoplay.reverseDirection = true
      } else if (swiperParallaxCard.activeIndex === 0) {
        swiperParallaxCard.params.autoplay.reverseDirection = false
      }
    });
    swiperParallaxBanner.on('slideChange', function () {
      if (swiperParallaxBanner.activeIndex === 12) {
        swiperParallaxBanner.params.autoplay.reverseDirection = true
      } else if (swiperParallaxBanner.activeIndex === 0) {
        swiperParallaxBanner.params.autoplay.reverseDirection = false
      }
    });
    jarallax(document.querySelector('.section01 .jarallax'), {
      type: 'scroll-opacity',
      speed: 0.6
    });
    jarallax(document.querySelectorAll('.section02 .jarallax'), {
      speed: 0.7
    });
    jarallax(document.querySelectorAll('.swiper-card .jarallax'), {
      type: 'scroll-opacity',
      speed: 0.4,
    });
    jarallax(document.querySelectorAll('.section04 .jarallax'), {
      type: 'scroll',
    });
    jarallax(document.querySelector('.section05 .jarallax'), {
      type: 'scale',
      imgSize: 'contain'
    });
  }
})();
