import { AxiosError } from "axios";
import { ApiPhones } from "../api";

const getPhones = async () : Promise<IPhone[]> => {
    try {
        const {data} = await ApiPhones.get<IPhone[]>('http://localhost:3001/persons') 
        return data
    } catch (error) {
        if(error instanceof AxiosError){
            throw error
        }
        throw new Error('Unexpected error')
    }
}

const createPhone = async (phone:Omit<IPhone,'id'>) : Promise<IPhone> => {
    try {
        const {data} = await ApiPhones.post<IPhone>('http://localhost:3001/persons',{...phone})  
        return data
    } catch (error) {
        if(error instanceof AxiosError){
            throw error
        }
        throw new Error('Unexpected error')
    }
}

const updatePhone = async (phone:IPhone) : Promise<IPhone> => {
    try {
        const {data} = await ApiPhones.put<IPhone>(`http://localhost:3001/persons/${phone.id}`,
        {
            name:phone.name,
            number:phone.number
        })  
        return data
    } catch (error) {
        if(error instanceof AxiosError){
            throw error
        }
        throw new Error('Unexpected error')
    }
}

const deletePhone = async (id:number) : Promise<IPhone> => {
    try {
        const {data} = await ApiPhones.delete<IPhone>(`http://localhost:3001/persons/${id}`) 
        return data
    } catch (error) {
        if(error instanceof AxiosError){
            throw error
        }
        throw new Error('Unexpected error')
    }
}

export default {getPhones,createPhone,updatePhone,deletePhone}