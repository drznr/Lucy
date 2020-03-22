<template>
  <section class="search-song">
    <input type="txt" v-model="queryStr" v-debounce:500ms="searchSong" />
    <ul>
      <li v-for="(song, idx) in songs" :key="idx">
        {{song.snippet.title}}
        <button class="search-song-add-btn" @click="emitAddSong(song)">
          <plus-icon></plus-icon>
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import plusIcon from "@/cmps/icons/plus.cmp.vue";
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
  },
  components:{
    plusIcon
  }
};
</script>

<style>
</style>