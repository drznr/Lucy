import { stationService } from '@/services/station.service';
import { storageService } from '@/services/storage.service';

const STATION_KEY = 'guest-stations';

export const stationStore = {
    state: {
        stations: [],
        currStation: null,
        isPlaying: false,
        currSong: null,
        labelsMap: null,
        lastPlayingTime: null
    },
    getters: {
        stations(state) {
            return state.stations;
        },
        currStation(state) {
            return state.currStation;
        },
        isPlaying(state) {
            return state.isPlaying;
        },
        LocalOwnerStationIds() {
            return storageService.load(STATION_KEY);
        },
        currSong(state) {
            return state.currSong;
        },
        labelsMap(state) {
            return state.labelsMap;
        },
        getLastPlayingTime(state) {
            return state.lastPlayingTime;
        }
    },
    mutations: {
        setNewTime(state, lastPlayingTime) {
            state.lastPlayingTime = lastPlayingTime
        },
        setStations(state, stations) {
            state.stations = stations;
        },
        setCurrStation(state, station) {
            state.currStation = station; 
        },
        setIsPlaying(state, isPlaying) {
            state.isPlaying = isPlaying
        },
        setCurrSong(state, song){
            if(!state.currStation) return
            state.currSong = song
        },
        addStation(state, { station }) { 
            state.stations.push(station);
        },
        updateStation(state, { station }) {
            const idx = state.stations.findIndex(currStation => currStation._id === station._id);
            state.stations.splice(idx, 1, station);
        },
        removeStation(state, stationId) {
            const idx = state.stations.findIndex(station => station._id === stationId);
            state.stations.splice(idx, 1);
            state.currStation = null
        },
        setLabelsMap(state, labelsMap) {
            state.labelsMap = labelsMap;
        },
        saveChatHistory(state, { history }) {
            state.currStation.chatHistory = history;
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
                context.commit('setCurrStation', station);
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
            
            context.commit({ type: 'addStation', station: addedStation });
            return addedStation;
        },
        async saveStation(context, { station }) {                     
            const updatedStation = await stationService.save(station);
            context.commit({ type: 'updateStation', station: updatedStation });
            return updatedStation;
        },
        async updateStation(context, { station }) { 
            if (!station.owner) {
                let guestStationIds = storageService.load(STATION_KEY);
                if (guestStationIds && guestStationIds.includes(station._id)) {
                    return await context.dispatch({type: 'saveStation', station});
                }
                return station;
            } else { 
                if (context.getters.loggedUser && station.owner._id === context.getters.loggedUser._id) { 
                    context.dispatch({type: 'saveStation', station});
                    return await context.dispatch({type: 'saveStation', station});
                }
            }
            return station;
        },
        async removeStation(context, { stationId }) {
            await stationService.remove(stationId);
            context.commit('removeStation', stationId);
        },
        async getLabelsMap(context) {
            const labelsMap = stationService.getLabelsMap(this.stations);
            context.commit('setLabelsMap', labelsMap);
        },
        // async saveStaionChat(context, { history }) {
        //     context.commit({ type: 'saveChatHistory', history });
        //     context.dispatch({type: 'saveStation', station :context.state.currStation});
        // }
    }
}

