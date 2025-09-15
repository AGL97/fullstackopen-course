import { AxiosError } from "axios";
import { ApiPhones } from "../api";

const getPhones = async () : Promise<IPhone[]> => {
    try {
        const {data} = await ApiPhones.get<IPhonesResponse>('/api/persons') 
        if(!data.data){
            return []
        }
        return data.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw error
        }
        throw new Error('Unexpected error')
    }
}

const createPhone = async (phone:Omit<IPhone,'id'>) : Promise<IPhone> => {
    try {
        const {data} = await ApiPhones.post<IPhoneResponse>('/api/persons',{...phone}) 

        if(!data.data){
            throw('Something go wrong!');
        }
        return data.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw error
        }
        throw new Error('Unexpected error')
    }
}

const updatePhone = async (phone:IPhone) : Promise<IPhone> => {
    try {
        const {data} = await ApiPhones.put<IPhoneResponse>(`/api/persons/${phone.id}`,
        {
            name:phone.name,
            number:phone.number
        })  
        if(!data.data){
            throw new Error('Something go wrong!')
        }
        return data.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw error
        }
        throw new Error('Unexpected error')
    }
}

const deletePhone = async (id:number) : Promise<IPhone[]> => {
    try {
        const {data} = await ApiPhones.delete<IPhonesResponse>(`/api/persons/${id}`) 
        if(!data.data){
            throw new Error('Something go wrong!')
        }

        return data.data
    } catch (error) {
        if(error instanceof AxiosError){
            throw error
        }
        throw new Error('Unexpected error')
    }
}

export default {getPhones,createPhone,updatePhone,deletePhone}