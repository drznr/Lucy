import axios from 'axios';

const API_KEY = 'AIzaSyD09tfK-pjT-G6kEZmXRfeicoKR-neGKNU' ///// //// rans key --->'AIzaSyDD1nIJuc1thshvoaRykKhVDjI8-kbDSFM';  ////     /// daniel key --> AIzaSyD09tfK-pjT-G6kEZmXRfeicoKR-neGKNU
const limit = 50;


export const youtubeApiService = {
    youtubeQuery
}


async function youtubeQuery(query) {
    try {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${query}&maxResults=${limit}`);
        return res.data.items;
    } catch (err) {
        //////  HANDLE ERR
        console.log(err); //////////////////////////////// < handle error
    }
}