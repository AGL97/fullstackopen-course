import { useEffect, useMemo, useState } from "react";
import { Strings } from "../helpers/Strings";
import countriesService from "../services/countries/countries.service";
import type { ICountry } from "../types/countries";

export const useCountries = () => {
    const[searchQuery, setSearchQuery] = useState('')
    const [countries, setCountries] = useState<ICountry[]>([])    
    const [selectedCountry, setSelectedCountry] = useState<ICountry|null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAllCountries()
    },[])

    const getAllCountries = async () => {
        try {
            setIsLoading(true)
            await new Promise(resolve => setTimeout(resolve, 5000))
            const countries = await countriesService.getAllCountries()
            setCountries(countries)
        } catch (error) {
            if(error instanceof Error){
                alert(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }
    
    const filteredCountries: ICountry[] = useMemo(() => {
        if (searchQuery.length === 0) {
            return countries
        }
        return countries.filter(c => Strings.cleanString(c.name.common).includes(searchQuery))
    }, [countries, searchQuery])

    const searchCountries = (query: string) => {
        const q = Strings.cleanString(query);
        if (!q || q.length === 0) {
            setSearchQuery('')
            handleSelectCountry(null)
            return;
        }
        setSearchQuery(q)
        handleSelectCountry(null)
    }

    const handleSelectCountry = (country:ICountry | null) => {
        setSelectedCountry(country)
    }

    return {
        countries:filteredCountries,
        selectedCountry,
        isLoading,
        handleSelectCountry,
        searchCountries
    }
}


;