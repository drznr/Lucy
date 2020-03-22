<template>
  <section class="search-song">
    <input type="txt" v-model="queryStr" v-debounce:500ms="searchSong" />
    <ul>
      <li v-for="(song, idx) in songs" :key="idx" class="search-song-item">
        {{song.snippet.title}}
        <button class="search-song-item-btn" @click="emitAddSong(song)">
          <img src="@/assets/imgs/icons/plus.svg" alt="add song" title="Add Song" class="icon" />
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
      if (!this.queryStr) return this.songs = []
      this.songs = await youtubeApiService.youtubeQuery(this.queryStr);
    },
    emitAddSong(song){
     console.log('emitting add song with', song.snippet.title)
     this.$emit('add-song', song)
    }
  }
};
</script>

<style>
</style>