import { getCookies } from "../modules/cookies/cookies";
import { BACKEND_URL } from "../const";

const urlUser = `${BACKEND_URL}/user/`;
const urlAuth = `${BACKEND_URL}/auth/`;

export const getUser = (id) => {
    let accessToken = getCookies().accessToken;
    return fetch(`${urlUser}${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
};

export const addUser = (user) => {
    return fetch(urlUser, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
    })
};

export const updateUser = (id) => {
    //  return fetch(url, {})
};

export const removeUser = id => {
    //  return fetch(url, {})
};

export const auth = (data) => {
    return fetch(urlAuth, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.status === 200) return response.json();
            throw new Error();
        })
};

export const getUserDetails = (accessToken) => {
    return fetch(`${urlUser}details`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(data => data.json())
}