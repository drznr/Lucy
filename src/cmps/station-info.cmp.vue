<template>
    <section class="station-info" v-if="isActive">

    </section>
</template>

<script>
import { eventBusService } from '@/services/event-bus.service';

export default {
    data() {
        return {
            isActive: false
        } 
    },
    created() {
        eventBusService.$on('open-station-info', () => {
            this.isActive = true;
        });
    }
};
</script>