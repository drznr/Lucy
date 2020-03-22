import { stationService } from '@/services/station.service';
import { storageService } from '@/services/storage.service';

const STATION_KEY = 'guest-station';

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
            state.currStation = JSON.parse(JSON.stringify(station));
        }
    },
    actions: {
        async loadStations(context) { ///// get critirea from state later
            const stations = await stationService.query({});
            context.commit('setStations', stations);
        },
        async loadStation(context, { stationId }) {
            let station = await stationService.getById(stationId);
            if (!station) {
               station = storageService.load(STATION_KEY) || stationService.getNewStation();
            }
            context.commit('setCurrStation', station);
            return station;
        },
        async saveStation(context, { station }) {
            const isEdit = !!station._id;
            if (!context.getters.loggedUser) {
                storageService.store(STATION_KEY, station);
                context.commit({type: 'setCurrStation', station});
                return station;
            }
            const savedStation = await stationService.save(station);
            context.commit({
                type: (isEdit) ? 'updateStation' : 'addStation',
                station: savedStation
            })
            return savedStation;
        }
    }
}

