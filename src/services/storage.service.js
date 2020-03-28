const STATION_KEY = 'guest-stations';

export const storageService = {
    store,
    load,
    getStationIds
}


function store(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getStationIds() {
    return JSON.parse(localStorage.getItem(STATION_KEY));
}