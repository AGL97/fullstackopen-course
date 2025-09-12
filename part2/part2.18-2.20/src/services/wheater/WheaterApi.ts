import axios from 'axios'
import { API_URL_WHEATER } from '../../constants/apis'

export const WheaterApi = axios.create({
    baseURL: API_URL_WHEATER,
    headers:{
        'Content-Type':'application/json'
    }
})