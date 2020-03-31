<template>
    <section class="station-info" v-if="isActive">
        <button @click="closeModal" class="station-info-link btn-link">&larr;</button>
        <form @submit.prevent="emitInfo">
            <div class="station-info-type">
            <label>
                <input type="radio" value="playlist" v-model="stationInfo.type" />
                <img src="@/assets/imgs/icons/playlist.svg" alt="playlist" title="Playlist" class="station-info-type-icon" />
                <span>Playlist</span>
            </label>
            <!-- <label>
                <input type="radio" value="jukebox" v-model="stationInfo.type" />
                <img src="@/assets/imgs/icons/jukebox.svg" alt="jukebox" title="Jukebox" class="station-info-type-icon" />
                <span>Jukebox</span>
            </label> -->
            </div>
            <input type="text" placeholder="Station's Name" v-model="stationInfo.title" class="station-info-inp" required />
            <button class="station-info-btn btn">Publish</button>
        </form>
    </section> 
</template>

<script>
import { eventBusService } from '@/services/event-bus.service';

export default {
    data() {
        return {
            isActive: false,
            stationInfo: {
                title: '',
                type: 'playlist'
            }
        }
    },
    methods: {
        emitInfo() { 
            eventBusService.$emit('create-station', JSON.parse(JSON.stringify(this.stationInfo)));
            this.isActive = false;
            this.stationInfo.title = '';
            this.stationInfo.type = 'playlist';
        },
        closeModal() {
            this.isActive = false;
            this.stationInfo.title = '';
            eventBusService.$off('station-opened');
            this.$router.go(-1);
        }
    },
    created() {
        eventBusService.$on('station-opened', () => {
            this.isActive = true;
        });
    },
    destroyed() {
        this.stationInfo.title = '';
        eventBusService.$off('station-opened');
    }
};
</script>