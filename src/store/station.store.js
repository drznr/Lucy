import { stationService } from '@/services/station.service';

const STATION_KEY = 'guest-station';

export const stationStore = {
    state: {
        stations: [],
        currStation: null,
        isPlaying: false
    },
    getters: {
        stations(state) {
            return state.stations;
        },
        currStation(state) {
            return state.setCurrStation;
        },
        isPlaying(state){
            return state.isPlaying;
        }
    },
    mutations: {
        setStations(state, stations) {
            state.stations = stations;
        },
        setCurrStation(state, station) {
            state.currStation = JSON.parse(JSON.stringify(station));
        },
        setIsPlaying(state, isPlaying){
            state.isPlaying = isPlaying
        },
        addStation(state, { station }) {
            state.stations.push(station);
        },
        updateStation(state, { station }) {
            const idx = state.stations.findIndex(currStation => currStation._id === station._id);
            state.stations.splice(idx, 1, station);
        }
    },
    actions: {
        async loadStations(context) { ///// get critirea from state later
            const stations = await stationService.query({});
            context.commit('setStations', stations);
        },
        async loadStation(context, { stationId }) {
            let station = await stationService.getById(stationId) || stationService.getNewStation();
            context.commit('setCurrStation', station);
            return station;
        },
        async saveStation(context, { station }) {
            const isEdit = !!station._id;   /////  add owner at the server from session and createdAt also in server
            const savedStation = await stationService.save(station);
            context.commit({
                type: (isEdit) ? 'updateStation' : 'addStation',
                station: savedStation
            });
            return savedStation;
        }
    }
}

