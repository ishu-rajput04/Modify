import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function register({ email, username, password }) {
    const respone = await api.post("/route/auth/register", {
        email, username, password
    })
    console.log(respone.data)
    return respone.data
}

export async function login({ email, username, password }) {
    const respone = await api.post("/route/auth/login", {
        email, username, password
    })
    console.log(respone.data)
    return respone.data
}

export async function getMe() {
    const respone = await api.get("/route/auth/get-me")
    console.log(respone.data)
    return respone.data
}

export async function logOut() {
    const respone = await api.get("/route/auth/logout")
    console.log(respone.data)
    return respone.data
}
