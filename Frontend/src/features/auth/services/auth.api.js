import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function register({ email, username, password }) {
    const response = await api.post("/route/auth/register", {
        email, username, password
    })
    return response.data
}

export async function login({ email, username, password }) {
    const response = await api.post("/route/auth/login", {
        email, username, password
    })
    return response.data
}

export async function getMe() {
    const response = await api.get("/route/auth/get-me")
    return response.data
}

export async function logOut() {
    const response = await api.get("/route/auth/logout")
    return response.data
}
