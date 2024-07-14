import axios from 'axios';

const api = 'http://localhost:8080/api';

export async function getHotelListByAddress(data, callback) {
    await axios.get(`${api}/hotel/province=${data.province_id}&district=${data.district_id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err);
        })
}

export async function getHotelListByUserId(id, callback) {
    await axios.get(`${api}/hotel/user/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err);
        })
}

export async function getHotelDetails(id, callback) {
    await axios.get(`${api}/hotel/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err);
        })
}

export async function createHotel(data, callback) {
    await axios.post(`${api}/hotel/create`, data, {
        headers: {
            'Content-Type': `multipart/form-data;`,
        },
    })
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}

export async function updateHotel(id, data, callback) {
    await axios.put(`${api}/hotel/${id}`, data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}

export async function deleteHotel(id, callback) {
    await axios.delete(`${api}/hotel/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}