import axios from 'axios';

const api = 'http://localhost:8080/api';

export function getAllowedRoute(routes, role) {
    var allowedData = [];
    routes.forEach((route) => {
        if (route.permission) {
            if (route.permission.includes(role)) {
                allowedData.push(route);
            }
        } else {
            allowedData.push(route);
        }
    });

    return allowedData;
}

export function getAllowedNav(navigation, role) {
    var allowedData = [];
    navigation.forEach((nav) => {
        if (nav.permission) {
            if (nav.permission.includes(role)) {
                if (nav._children) {
                    nav._children.forEach((child, index) => {
                        if (child.permission && !child.permission.includes(role)) {
                            nav._children.splice(index, 1);
                        }
                    });
                }

                allowedData.push(nav);
            }
        } else {
            if (nav._children) {
                nav._children.forEach((child, index) => {
                    if (child.permission && !child.permission.includes(role)) {
                        nav._children.splice(index, 1);
                    }
                });
            }

            allowedData.push(nav);
        }
    });

    return allowedData;
}

export function login(data, callback) {
    axios.post(`${api}/auth/login`, data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}

export function register(data, callback) {
    axios.post(`${api}/auth/register`, data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            callback(err.response.data);
        })
}