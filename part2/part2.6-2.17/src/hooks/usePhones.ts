import { useEffect, useMemo, useState } from "react";
import phonesService from "../services/phones/phones.services";

export const usePhones = () => {
    const [phones, setPhones] = useState<IPhone[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isCreateLoading, setIsCreateLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [isUpdateLoading, setIsUpdateLoading] = useState(false)   
    const [successfullyOperation, setSuccessfullyOperation] = useState({
        title:'',
        message:'',
        backgroundColor:'#dee6e7ff',
        color:''
    })
    const [error, setError] = useState('')
    
    const filteredPhones: IPhone[] = useMemo(() => {
        if(searchQuery.length === 0){
            return phones
        }
        return phones.filter(p => cleanString(p.number).includes(searchQuery)) 
    }, [phones, searchQuery])
    
    useEffect(() => { 
        getAllPhones()
    }, [])  
    
    const getAllPhones = async () => {
        try {
            const phones = await phonesService.getPhones()
            setPhones(phones)
            setError('')
        } catch (error) {
            if(error instanceof Error){
                alert(error.message)
                setError(error.message)
            }
        }
    }

    const addPhone = async (name:string,number:string) => {
        if(name.length === 0 || number.length === 0) {
            alert('Fills Required')
            return;
        }

        if(isDuplicated(name)){
            const result = window.confirm(`${name.trim().toLowerCase().replace(/^\w/,c => c.toUpperCase())} is already registered do you want update the Phone`)
            const duplicatedPhone = phones.find(p => p.name === name)
            
            if(result && duplicatedPhone){
                const phonetoUpdate = {...duplicatedPhone,number}
                console.log(`Phone to update ${JSON.stringify(phonetoUpdate,null,2)}`);
                await updatePhone(phonetoUpdate)  
                alert('Phone updated successfully')                   
            }
            return;
        }

        const newPhone : IphoneWithoutId = {
            name,
            number
        }
        
        try {
            setIsCreateLoading(true)
            const createdPhone = await phonesService.createPhone(newPhone)
            setPhones(prev => [...prev,createdPhone])       
            console.log('Added new number!!!',JSON.stringify(newPhone,null,2))
            setSuccessfullyOperation(prev =>({
                ...prev,
                title:'Phone added',
                message:`Name: ${createdPhone.name} | Number: ${createdPhone.number}`,
                color:'#439c43ff'
            }))
            setError('')
        } catch (error) {
            if(error instanceof Error){
                alert('Error adding phone')
                console.log(`Error adding phone ${error.message}`);   
                setError(error.message)
            }            
        } finally {
            setIsCreateLoading(false)
        }
    }

    const deletePhone = async (phone:IPhone) => {                      
        try {
            setIsDeleteLoading(true)
            const deletedPhone = await phonesService.deletePhone(phone.id)
            setPhones(prev => prev.filter(phone => phone.id !== phone.id))
            console.log('Deleted phones',phone.id)
            setSuccessfullyOperation(prev => ({
                ...prev,
                title:'Phone deleted',
                message:`Name: ${deletedPhone.name} | Number: ${deletedPhone.number}`,                
                color:'#a59a46ff'
            }))
            setError('')
        } catch (error) {
            if(error instanceof Error){
                alert('Error deleting phone')
                console.log(`Error deleting phone ${error.message}`);                  
                setError(`Information about ${phone.name} already was deteled`)
            }            
        } finally{
            setIsDeleteLoading(false)
        }
    }

    const updatePhone = async (phone:IPhone) => {
        if(phone.name.length === 0 || phone.number.length === 0) {
            alert('Fills Required')
            return;
        }
        
        if(!phone){
            alert('Phone not found')
            return;
        }
        
        try {
            setIsUpdateLoading(true)
            const updatedPhone = await phonesService.updatePhone(phone)
            console.log('Updated phone after update in server',updatedPhone) 
            setPhones(prev => prev.map(p => p.id === phone.id ? updatedPhone : p))      
            setError('')
            setSuccessfullyOperation(prev => ({
                ...prev,
                title:'Phone Updated',
                message:`Name: ${updatedPhone.name} | Number: ${updatedPhone.number}`,
                color: '#4e9ba0be'
            }))
            return updatedPhone
        } catch (error) {
            if(error instanceof Error){
                alert('Error updating phone')
                console.log(`Error updating phone ${error.message}`); 
            }
        } finally {
            setIsUpdateLoading(false)
        }
    }

    // const getLastId = () => {
    //     const iDs = phones.map((phone) => phone.id)
    //     return Math.max(...iDs)
    // }

    const isDuplicated = (name:string) => {
        return phones.some(phone => phone.name.toLowerCase() === name.trim().toLowerCase())        
    }    

    const searchPhone = (query: string) => {    
        const q = cleanString(query);      
        if (q && q.length === 0){
            return
        } 
        setSearchQuery(q)        
    };

    const cleanSuccessfullyOperation = () => {
        setSuccessfullyOperation(prev => ({
            ...prev,
            title:'',
            message:'',
            color:''
        }))
    }

    const cleanError = () => {
        setError('')
    }

    return {
        phones: filteredPhones,
        isCreateLoading,
        isDeleteLoading,
        isUpdateLoading,
        error,
        successfullyOperation,
        cleanError,
        cleanSuccessfullyOperation,
        searchPhone,
        addPhone,
        deletePhone,
        updatePhone,
    }
}

const cleanString = (str: string) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');