<template>
    <section class="home" >
        <header class="home-header">
            <div class="home-header-heading">
                <h1>Meet Lucy</h1>
                <span>Discover our live jukeboxes & playlist's and share your own with the world</span>
                <router-link to="/station" class="home-header-heading-link">
                    Get started
                </router-link>
            </div>
        </header>
        <main>
            <station-slider :stations="stations"></station-slider>
 
            <article class="home-teaser">
                <div class="home-teaser-figures">
                    <figure></figure>
                    <figure></figure>
                </div>
                <div class="home-teaser-info">
                    <h2>Never stop listening</h2>
                    <p>
                        Lucy let's you hear music as playlist or jukebox and share your own playlists with the world.
                    </p>
                </div>
                <div class="home-teaser-teaser">
                    <figure></figure>
                    <div class="home-teaser-teaser-txt">
                        <h2>Calling all creators</h2>
                        <p>
                            Get on Lucy to share your sounds, and grow your audience. What are you waiting for?
                        </p>
                        <router-link to="/station/new" class="home-teaser-teaser-txt-btn">Share your own</router-link>
                    </div>
                    <img src="@/assets/imgs/chapman.jpg" alt="artist" class="home-teaser-teaser-img" />
                </div>
            </article>
        </main>
    </section>
</template>

<script>
import stationSlider from '@/cmps/station-slider.cmp';

export default {
    components: {
        stationSlider
    },
    computed: {
        stations() {
            return this.$store.getters.stations;
        }
    },
};
</script>

