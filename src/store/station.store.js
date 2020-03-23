import { stationService } from '@/services/station.service';
import { storageService } from '@/services/storage.service';

const STATION_KEY = 'guest-stations';

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
        },
        LocalOwnerStationIds() {
            return storageService.load(STATION_KEY);
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
            context.commit({ type: 'setInProgress', inProgress: true })
            const stations = await stationService.query({});
            context.commit('setStations', stations);
            context.commit({ type: 'setInProgress', inProgress: false })
        },
        async loadStation(context, { stationId }) {
            context.commit({ type: 'setInProgress', inProgress: true })
            let station = await stationService.getById(stationId) || stationService.getNewStation();
            context.commit('setCurrStation', station);
            context.commit({ type: 'setInProgress', inProgress: false })
            return station;
        },
        async addStation(context, { station }) {
            const addedStation = await stationService.save(station);/////  add owner from session and createdAt also in server
            context.commit({type: 'addStation', station: addedStation});
            if (!addedStation.owner) {
                let guestStationIds = storageService.load(STATION_KEY);
                if (guestStationIds) {
                    if (!guestStationIds.includes(addedStation._id)) {
                        guestStationIds.push(addedStation._id);
                        storageService.store(STATION_KEY, guestStationIds);
                    }
                } else {
                    guestStationIds = [];
                    guestStationIds.push(addedStation._id);
                    storageService.store(STATION_KEY, guestStationIds);
                }
            }
            return addedStation;
        },
        async updateStation(context, { station }) {
            if (!station.owner) {
                let guestStationIds = storageService.load(STATION_KEY);
                if (guestStationIds && guestStationIds.includes(station._id)) {
                    const updatedStation = await stationService.save(station);
                    context.commit({type: 'updateStation', station: updatedStation});
                    return updatedStation;
                }
                return station;
            } //// else do it if he's loggedInUser
        }
    }
}

