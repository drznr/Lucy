<template>
  <section>
    <swiper :options="swiperOptions" class="swiper container">
      <swiper-slide v-for="station in stations" v-bind:key="station.id">
              <!-- {{station}} -->
        <!-- <img :src="station."> -->
        <!-- <section class="app-slider-card-hover-controls"> -->
          <!-- <button @click="pausePlay">pausePlay</button> -->
          <p class="title">{{station.title}}</p>
        <!-- </section> -->
      </swiper-slide>
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
  props: {
    stations: Array,
    // currSong
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 60,
        grabCursor: true,
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