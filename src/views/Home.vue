<template>
    <section class="home" >
        <header class="home-header">
            <div class="home-header-heading">
                <h1>Meet Lucy</h1>
                <span>Discover our live jukeboxes & playlist's and share your own with the world</span>
                <router-link to="/station" class="home-header-heading-link">Check it out</router-link>
            </div>
        </header>
        <main>
            <station-slider></station-slider>
        </main>
    </section>
</template>

<script>
import stationSlider from '@/cmps/station-slider.cmp';

export default {
    components: {
        stationSlider
    }
};
</script>