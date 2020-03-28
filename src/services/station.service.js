import { httpService } from './http.service';
import { storageService } from '@/services/storage.service';

const STATION_KEY = 'guest-stations';


export const stationService = {
    query,
    getById,
    getNewStation,
    save,
    remove,
    getEmptyCritirea
}

function query(critirea) {      
    const params = new URLSearchParams(critirea); 
    return httpService.get(`station?${params}`);
}
function getById(id) {
    return httpService.get(`station/${id}`);
}
function remove(id) {
    return httpService.delete(`station/${id}`);
}
async function save(station) {                        
    let prm;
    if (station._id) prm = httpService.put(`station/${station._id}`, station);
    else {
        prm = httpService.post('station', station);
    }
    const res = await prm;
    _saveStationIdLocaly(res);
    return res;
}
function getNewStation() {
    return {
        title: '',
        type: 'playlist',
        imgUrl: '',
        description: '',
        createdAt: null,
        currSong: null,
        labels: [],
        owner: null,
        followers: [],
        rate: 0,
        songs: [],
        chatHistory: []
    }
}
function getEmptyCritirea() {
    return {
        txt: '',
        searchIn: '',
        page: '',
        sortBy: ''
    }
}


function _saveStationIdLocaly(station) {   
    if (!station.owner) {
        let guestStationIds = storageService.load(STATION_KEY);
        if (guestStationIds) {
            if (!guestStationIds.includes(station._id)) {
                guestStationIds.push(station._id);
                storageService.store(STATION_KEY, guestStationIds);
            }
        } else {
            guestStationIds = [];
            guestStationIds.push(station._id);
            storageService.store(STATION_KEY, guestStationIds);
        }
    }
}


