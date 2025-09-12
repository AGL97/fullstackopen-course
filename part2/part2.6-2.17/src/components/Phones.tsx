import { useEffect, type MouseEvent } from "react"
import { usePhones } from "../hooks/usePhones"
import './Phones.css'

export const Phones= () => { 
    const { phones,isDeleteLoading,successfullyOperation,error,addPhone,searchPhone,deletePhone,cleanSuccessfullyOperation,cleanError} = usePhones()

    useEffect(() => {
        let timer:number ;
        if(successfullyOperation.title.length > 0){
            timer = setTimeout(() => {
                cleanSuccessfullyOperation()
            }, 3000)
        }
        return () => {
            if(timer){
                clearTimeout(timer)
            }
        }
    }, [successfullyOperation,cleanSuccessfullyOperation])

    const onAdd = (event: MouseEvent) => {
        event.preventDefault();
        const newNameSelector : HTMLInputElement | null = document.querySelector<HTMLInputElement>('#name')
        const newPhoneNumberSelector : HTMLInputElement | null = document.querySelector<HTMLInputElement>('#phone')

        if(!newNameSelector || !newPhoneNumberSelector) {
            alert('Unexpected error')
            return
        } else if(newNameSelector.value.length === 0 || newPhoneNumberSelector.value.length === 0) {                
            alert('Please fill in all fields')
            return
        }
        
        const newName = newNameSelector.value ?? 'No name provided'
        const newPhone = newPhoneNumberSelector.value ?? 'No name provided'

        addPhone(newName,newPhone)
        newNameSelector.value = ''
        newPhoneNumberSelector.value = '' 
    }

    // console.log('Phones', JSON.stringify(phones,null,2));
    
    return (
    <section>

        <h1>Phones</h1>
        <form className="phoneContainer">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Name"/>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="Phone"/>
            <button type="button" onClick={onAdd}> 
            Add phone
        </button>
        </form>
        <h1>Search Phone</h1>
        <input type="search" name="searchNumber" id="searchNumber" onChange={(e) => searchPhone(e.target.value)} />
        
        

        {(phones && phones.length > 0) ? <ul>
        {
            phones.map((phone) => 
                (<li key={phone.id} className="phoneItem">
                    <p>{phone.name}: {phone.number}</p>
                    <button 
                        type="button" 
                        disabled={isDeleteLoading} 
                        onClick={() => {
                            const result = window.confirm('Are you sure you want to delete this phone?')
                            if(result){
                                deletePhone(phone)
                            }
                        }}>
                            Delete
                        </button>
                </li>)
            )
        }
        </ul> : <p>No phones stored</p>}

       
        { successfullyOperation.title.length > 0 &&
            <section className="successfullyOperation" style={{
                backgroundColor:successfullyOperation.backgroundColor,
                borderWidth: 4,
                borderRadius: 8,
                borderColor: successfullyOperation.color,
                borderStyle:'solid',
                padding:10,
            }}>
                <h1 style={{color:successfullyOperation.color}}>{successfullyOperation.title}</h1>
                <h3 style={{color:successfullyOperation.color}}>{successfullyOperation.message}</h3>
            </section>
        }

        {error.length > 0 && <p onClick={cleanError} className="error">Error: {error}</p>}

    </section>
    )
}
