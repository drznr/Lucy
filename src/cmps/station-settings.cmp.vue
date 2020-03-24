<template>
    <section class="station-settings">
        <form @submit.prevent="editStation">
            <input type="text" placeholder="Station's Title" v-model="currStation.title" />
            <textarea placeholder="Station's Description" v-model="currStation.description"></textarea>
            <input type="text" placeholder="Station's Labels & Genres" v-model="labels" />
            <label>
                Station Thumbnail:
                <input type="file" @change="uploadImage">
            </label>
            <button>Save</button>
        </form>
        <!-- PRE  -->
        <pre>
            {{ currStation }}
        </pre>
        <!-- PRE  -->
    </section> 
</template>

<script>
import { stationService } from "@/services/station.service";
import { uploadService } from "@/services/upload.service";

export default {
    props: {
       routesProps: Object
    },
    data() {
        return {
            currStation: JSON.parse(JSON.stringify(this.routesProps.station))
        }
    },
    computed: {
        labels: {
            get() {
                return this.currStation.labels.join(' ');
            },
            set(val) {
                this.currStation.labels = val.split(' ');
            }
        },
        inProgress() {
            return this.$store.getters.inProgress;
        }
    },
    methods: {
        editStation() {
            debugger
        },
        async uploadImage(ev) {
            this.$store.commit({type: 'setInProgress', inProgress: true}); console.log(this.inProgress)
            const imgData = await uploadService.uploadImg(ev);
            this.currStation.imgUrl = imgData.secure_url;
            this.$store.commit({type: 'setInProgress', inProgress: false}); console.log(this.inProgress)
        }
    }
};
</script>