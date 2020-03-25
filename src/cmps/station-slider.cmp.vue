<template>
  <section>
    <swiper :options="swiperOptions" class="swiper">
      <swiper-slide v-for="station in stations" :key="station._id">
        <div class="swiper-card ratio-square">
            <figure class="swiper-card-img-wrap" :style="{backgroundImage: (station.imgUrl) ? `url('${station.imgUrl}')` : `url(${require('@/assets/imgs/station-default-thumb.png')})` }">
            <span>
              <router-link :to="'/station/' + station._id">
                <h3 class="swiper-title">{{station.title}}</h3>
                <p class="swiper-description">{{station.description}}</p>
              </router-link> 
            </span>
            </figure>
        </div>
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
    SwiperSlide
  }
};
</script>

