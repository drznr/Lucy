<template>
  <section class="search-song">
    <input type="txt" v-model="queryStr" v-debounce:500ms="searchSong" />
    <ul>
      <li v-if="songs.length" v-for="(youtubeSong, idx) in songs" :key="idx" >
        {{youtubeSong.snippet.title}}
        <button class="search-song-add-btn" @click="emitAddSong(youtubeSong)">
          <plus-icon></plus-icon>
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import plusIcon from "@/cmps/icons/plus.cmp.vue";
import { youtubeApiService } from "@/services/youtube-api.service";

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
  },
  components: {
    plusIcon
  }
};
</script>

<style>
</style>