import { stationService } from '@/services/station.service';
import { storageService } from '@/services/storage.service';

const STATION_KEY = 'guest-stations';

export const stationStore = {
    state: {
        stations: [],
        currStation: null,
        isPlaying: false,
        currSong: null,
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
        },
        currSong(state) {
            return state.currSong
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
        setCurrSong(state, songId){
            if(!state.currStation) return
            const song = state.currStation.songs.find(song => song.embedId === songId);
            state.currSong = song
        },
        addStation(state, { station }) {
            state.stations.push(station);
        },
        updateStation(state, { station }) {
            const idx = state.stations.findIndex(currStation => currStation._id === station._id);
            state.stations.splice(idx, 1, station);
        },
        removeStation(state, { stationId }) {
            const idx = state.stations.findIndex(station => station._id === stationId);
            state.stations.splice(idx, 1);
        }
    }, 
    actions: {
        async loadStations(context, { filterBy }) {  
            context.commit({ type: 'setInProgress', inProgress: true })
            const stations = await stationService.query(filterBy);
            context.commit('setStations', stations);
            context.commit({ type: 'setInProgress', inProgress: false })
        },
        async loadStation(context, { stationId }) {
            let station;
            if (stationId === 'new') {
                station = stationService.getNewStation();
            } else {
                context.commit({ type: 'setInProgress', inProgress: true });
                station = await stationService.getById(stationId);
                context.commit('setCurrStation', station);
                context.commit({ type: 'setInProgress', inProgress: false });
            }
            return station;
        },
        async addStation(context, { station }) {
            const addedStation = await stationService.save(station);
            context.commit({type: 'addStation', station: addedStation});
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
        },
        async removeStation(context, { stationId }) {
            await stationService.remove(stationId);        
            context.commit('removeStation', stationId);
            //// SWAL to confirm and $router.push('/station')
        }
    }
}

