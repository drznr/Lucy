import { httpService } from './http.service';

export const stationService = {
    query,
    getById,
    getNewStation,
    save
}

function query(creterea) {
    const params = new URLSearchParams(creterea);
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
    return await prm;
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

    }
}

