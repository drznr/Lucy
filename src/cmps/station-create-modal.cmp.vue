<template>
    <section class="station-info" v-if="isActive">
        <form @submit.prevent="emitInfo">
            <input type="text" placeholder="Station's Name" v-model="stationInfo.title" />
            <label>Station's Name</label>
                Type: 
            <label>
                Playlist
                <input type="radio" value="playlist" v-model="stationInfo.type" />
            </label>
            <label>
                Jukebox
                <input type="radio" value="jukebox" v-model="stationInfo.type" />
            </label>
            <!--MAYBE GET description & labels also here... -->
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
                type: 'playlist',
                description: ''
            }
        }
    },
    methods: {
        emitInfo() {
            debugger
        }
    },
    created() {
        eventBusService.$on('open-station-info', () => {
            this.isActive = true;
        });
    }
};
</script>