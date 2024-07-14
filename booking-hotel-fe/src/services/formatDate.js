import moment from 'moment';

export function formatToDate(dateString) {
    return moment(dateString).format('DD-MM-YYYY');
}

export function formatToDateTime(TimeString) {
    return moment(TimeString).format('YYYY-MM-DD HH:mm:ss');
}