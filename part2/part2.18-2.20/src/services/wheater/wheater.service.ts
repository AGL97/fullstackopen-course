import { AxiosError } from "axios";
import { API_KEY_WHEATER } from "../../constants/apis";
import type { IWheater } from "../../types/wheater";
import { WheaterApi } from "./WheaterApi";

const getWeather = async (city:string) : Promise<IWheater> => {
    try {
        const {data} = await WheaterApi.get<IWheater>(`/weather?q=${city}&appid=${API_KEY_WHEATER}&units=metric`)        
        return data
    } catch (error) {
        if(error instanceof AxiosError){
            throw error
        }
        throw new Error('Unexpected error')
    }
}

export default {getWeather}