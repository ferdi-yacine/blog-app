import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "YOUR_API_SERVER",
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
})