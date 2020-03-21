import { stationService } from '@/services/station.service';
import { youtubeApiService } from '@/services/youtube-api.service';

export const stationStore = {
    state: {
        stations: [],
        currStation: null,
    },
    getters: {
        stations(state) {
            return state.stations;
        },
        currStation(state) {
            return state.setCurrStation;
        }
    },
    mutations: {
        setStations(state, stations) {
            state.stations = stations;
        },
        setCurrStation(state, station) {
            state.currStation = station;
        }
    },
    actions: {
        async loadStations(context) { ///// get critirea from state later
            const stations = await stationService.query({});
            context.commit('setStations', stations);
        },
        async loadStation(context, { stationId }) {
            const station = stationService.getById(stationId);
            context.commit('setCurrStation', station);
            return station;
        },
        async getYoutubeSongs(context, { queryStr }) {
            const songs = await youtubeApiService.youtubeQuery(queryStr);
            return songs;
        },
        async removeSong(context, { song }) {
            const songs = await youtubeApiService.youtubeQuery(queryStr);
            return songs;
        },
    }
}

