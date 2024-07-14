import axios from 'axios';

const api = 'http://localhost:8080/api';

export async function getProvinceList(callback) {
    await axios.get(`${api}/province`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err);
        })
}