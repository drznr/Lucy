<template>
  <section class="search-song">
    <input type="txt" v-model="queryStr" v-debounce:500ms="searchSong" />
    <ul>
<<<<<<< HEAD
      <li v-if="songs.length" v-for="(youtubeSong, idx) in songs" :key="idx" >
        {{youtubeSong.snippet.title}}
        <button class="search-song-add-btn" @click="emitAddSong(youtubeSong)">
          <plus-icon></plus-icon>
=======
      <li v-for="(song, idx) in songs" :key="idx" class="search-song-item">
        {{song.snippet.title}}
        <button class="search-song-item-btn" @click="emitAddSong(song)">
          <img src="@/assets/imgs/icons/plus.svg" alt="add song" title="Add Song" class="icon" />
>>>>>>> 8a138931fa2704021a6222eb7590a79baef1b790
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import { youtubeApiService } from '@/services/youtube-api.service';

export default {
  data() {
    return {
      queryStr: "",
      songs: []
    };
  },
  methods: {
    async searchSong() {
      if (!this.queryStr) return (this.songs = []);
      this.songs = await youtubeApiService.youtubeQuery(this.queryStr);
    },
    emitAddSong(youtubeSong) {
      const song = {
        title: youtubeSong.snippet.title,
        embedId: youtubeSong.id.videoId,
        thumbnail: youtubeSong.snippet.thumbnails.default.url
      };
      console.log('ready:', song)
      this.$emit("add-song", song);
    }
<<<<<<< HEAD
  },
  components: {
    plusIcon
=======
>>>>>>> 8a138931fa2704021a6222eb7590a79baef1b790
  }
};
</script>

<style>
</style>