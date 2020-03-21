import { stationService } from '@/services/station.service';

export const stationStore = {
    state: {
        stations: [],
        currStation: null
    },
    getters: {
        stations(state) {
            return state.stations;
        },
        currStation(state) {
            return state.setCurrStation;
        },
        playlistById(state) {
            if (state.currStation) return state.currStation.songs.map(song => song.embedId)
            else return []
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
        }
    }
}