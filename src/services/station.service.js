import httpService from './HttpService';


export const stationService = {

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
function getEmptyCritirea() {
    return {

    }
}
