import { AxiosError } from 'axios'
import type { ICountry } from "../../types/countries"
import { CountriesApi } from "./CountriesApi"

const getAllCountries = async () => {
    try {
        const {data} = await CountriesApi.get<ICountry[]>('/all')        
        return data
    } catch (error) {
        if(error instanceof AxiosError){
            throw error
        }
        throw new Error('Unexpected error')
    }
}

const getCountrisByName = async (name:string) => {
    try {
        const {data} = await CountriesApi.get<ICountry[]>(`/${name}`)
        return data
    } catch (error) {
        if(error instanceof AxiosError){
            throw error
        }
        throw new Error('Unexpected error')
    }
}

export default {
    getAllCountries,
    getCountrisByName
}