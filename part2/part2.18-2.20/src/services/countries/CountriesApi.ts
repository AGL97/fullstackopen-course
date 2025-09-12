import axios from 'axios'
import { API_URL_COUNTRIES } from '../../constants/apis'

export const CountriesApi = axios.create({
    baseURL: API_URL_COUNTRIES,
    headers:{
        'Content-Type':'application/json'
    }
})