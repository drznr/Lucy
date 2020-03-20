<template>
  <section>
    <swiper :options="swiperOptions" class="swiper container">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: 'swiper-example-loop',
  title: 'Loop mode / Infinite loop',
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 60,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        }
      }
    };
  },
  components: {
    Swiper,
    SwiperSlide
  }
};
</script>