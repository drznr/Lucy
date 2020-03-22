import { stationService } from '@/services/station.service';

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
        async saveStation(context, { station }) {
            const savedStation = await stationService.save(station)
            console.log('Saved: ', savedStation)
            context.commit({
                type: (isEdit) ? 'updateToy' : 'addToy',
                station: savedStation
            })
            return savedToy
        },
    }
}

