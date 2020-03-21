<template>
    <section>
        <transition name="fade">
            <div class="cover" v-if="isActive" @click="isActive = false">
                <aside class="modal">
                    
                </aside>
            </div>
        </transition>
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
        eventBusService.$on('open-modal', () => {
            this.isActive = true;
        });
    }
};
</script>