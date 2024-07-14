import axios from 'axios';

const api = 'http://localhost:8080/api';

export async function createBooking(data, callback) {
    await axios.post(`${api}/booking/create`, data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}

export async function getBookingList(user_id, callback) {
    await axios.get(`${api}/booking/user_id=${user_id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err);
        })
}

export async function getBookingListByHotel(hotel_id, callback) {
    await axios.get(`${api}/booking/hotel=${hotel_id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err);
        })
}

export async function updateBooking(id, data, callback) {
    await axios.put(`${api}/booking/${id}`, data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err);
        })
}