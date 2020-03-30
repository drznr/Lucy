<template>
  <section class="search-song">
    <input type="txt" v-model="queryStr" v-debounce:500ms="searchSong" placeholder="Enter song name" class="search-song-inp" />
    <ul class="search-song-list">
      <li v-for="(youtubeSong, idx) in songs" :key="idx" class="search-song-list-item">
          <button class="search-song-list-item-btn" @click="emitAddSong(youtubeSong)">
          <plus-icon title="Add Song" class="icon"></plus-icon>  
        </button> 
          {{youtubeSong.snippet.title}}
      </li> 
    </ul>
  </section>
</template>

<script>
import { youtubeApiService } from '@/services/youtube-api.service';
import plusIcon from '@/cmps/icons/plus-icon.cmp';

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