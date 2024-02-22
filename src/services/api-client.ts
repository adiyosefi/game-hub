import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '8a21cc5a2ea34354968504f8dfa10541'
    }
})