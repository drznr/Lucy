import Axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3000/api/';
// const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3000/';

const axios = Axios.create({
    withCredentials: true
});

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data);
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data);
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data);
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data);
    }
}

async function ajax(endpoint, method = 'get', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })
        return res.data;
    } catch (err) {                 
        switch (err.response.status) {
            case 401:
                console.log(err); //////////////////////////////// < handle error

                break;
            case 404:
                console.log(err); //////////////////////////////// < handle error

                break;
            default:
                break;
        }
    }
}

