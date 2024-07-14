import axios from 'axios';

const api = 'http://localhost:8080/api';

export function getRoomList(hotel_id, callback) {
    axios.get(`${api}/room/hotel_id=${hotel_id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err);
        })
}

export function createRoom(data, callback) {
    axios.post(`${api}/room/create`, data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}

export function getRoomDetails(id, callback) {
    axios.get(`${api}/room/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}

export function updateRoom(id, data, callback) {
    axios.put(`${api}/room/${id}`, data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}

export function deleteRoom(id, callback) {
    axios.delete(`${api}/room/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}