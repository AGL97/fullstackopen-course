import axios from "axios";

export const ApiPhones = axios.create({
    baseURL: '/api',
    headers:{
        "Content-Type": "application/json"
    }
})