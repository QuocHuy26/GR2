import axios from 'axios';

const api = 'http://localhost:8080/api';

export function getDistrictListByProvince(province_id, callback) {
    console.log(province_id);
    axios.get(`${api}/district/${province_id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err);
        })
}