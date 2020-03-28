<template>
    <section class="station-player">
      <youtube-iframe 
        :currSong="currSong" 
        :stationRate="stationRate" 
        :isPlaylistEmpty="isPlaylistEmpty"
        ></youtube-iframe>
      <div class="station-player-playlist">
        <ul>
          <draggable v-model="playlist" @start="onDrag=true" @end="onDrag=false" v-bind="dragOptions">
            <transition-group type="transition" :name="onDrag ? 'flip-list' : null">
              <li v-for="(song, idx) in station.songs" :key="idx" class="station-player-playlist-item drag-item">
                <span>{{song.title}}</span>
                <button @click="removeSong(idx)" v-if="isStationOwner" class="station-player-playlist-remove">&times;</button>
                <button @click="playSong({...song, idx})" class="station-player-playlist-play">&#9654;</button>
              </li>
            </transition-group>
          </draggable> 
        </ul>
      </div>
    </section>    
</template>
 
<script>
import { eventBusService } from "@/services/event-bus.service";
import youtubeIframe from "@/cmps/youtube-iframe.cmp.vue";
import draggable from 'vuedraggable';

export default {
  name: "transition-example-2",
  display: "Transitions",
  props: {
      station: Object,
      currSong: Object,
      isStationOwner: Boolean,
      isPlaylistEmpty: Boolean
  },
  data() {
    return {
      onDrag: false
    }
  },
  computed: {
    playlist: {   
      get() {
        return this.station.songs;
      },
      set(val) {
        this.$emit('order-changed', val);
      }
    },
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
    stationRate(){
      return (this.station)? this.station.rate : 0;
    }
  },
  methods: {
    async removeSong(idx) {
        this.$emit('song-removed', idx);
    },
    playSong(song) {
      this.$emit('switched-song', song);
    }
  },
  components: {
    youtubeIframe,
    draggable
  }
};
</script>