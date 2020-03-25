<template>
  <section>
    <swiper :options="swiperOptions" class="swiper">
      <swiper-slide v-for="station in stations" :key="station._id">
        <station-preview :station="station"></station-preview>
      </swiper-slide>

      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </section>
</template> 

<script>
import stationPreview from "@/cmps/station-preview.cmp";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "swiper-example-loop",
  title: "Loop mode / Infinite loop",
  props: {
    stations: Array
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 5,
        spaceBetween: 60,
        grabCursor: true,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false
        }
      }
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    stationPreview
  }
};
</script>

