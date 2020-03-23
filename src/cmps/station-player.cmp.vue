<template>
    <section class="station-player">
      <youtube-iframe :currSong="currSong" @switch-song="switchSong"></youtube-iframe>
      <div class="station-player-playlist">
        <ul>
          <draggable v-model="playlist" @start="onDrag=true" @end="onDrag=false" v-bind="dragOptions">
            <transition-group type="transition" :name="onDrag ? 'flip-list' : null">
              <li v-for="(song, idx) in station.songs" :key="idx" class="drag-item">
                <span>{{song.title}}</span>
                <button @click="removeSong(idx)" v-if="isStationOwner">&times;</button>
                <button @click="playSong(song.embedId)">&#9654;</button>
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
      isStationOwner: Boolean
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
    }
  },
  methods: {
    async removeSong(idx) {
        this.$emit('song-removed', idx);
    },
    playSong(id) {
      eventBusService.$emit('play-song', id);
    },
    switchSong(data) { 
      if (data.diff === -1) {
        data.idx--;
        data.idx = (data.idx < 0) ? (this.station.songs.length - 1) : data.idx;
      } else {
        data.idx++;
        data.idx = (data.idx === this.station.songs.length) ? 0 : data.idx;
      };
      this.$emit('switched-song', {embedId: this.station.songs[data.idx].embedId, idx: data.idx})
    }
  },
  components: {
    youtubeIframe,
    draggable
  }
};
</script>