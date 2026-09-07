import axios from "axios";

const api = axios.create({
    baseURL: "https://modify-3-mxw8.onrender.com",
    withCredentials: true
})

export async function getSong(mood) {
    const response = await api.get("/route/song?mood=" + mood)
    console.log(response)
    return response.data
}