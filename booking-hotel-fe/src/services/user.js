import axios from 'axios';

const api = 'http://localhost:8080/api';

export function getUserList(callback) {
    axios.get(`${api}/user`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err);
        })
}

export function getUserDetails(id, callback) {
    axios.get(`${api}/user/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err);
        })
}

export function createUser(data, callback) {
    axios.post(`${api}/user/create`, data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}

export function updateUser(id, data, callback) {
    axios.put(`${api}/user/${id}`, data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}

export function deleteUser(id, callback) {
    axios.delete(`${api}/user/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}