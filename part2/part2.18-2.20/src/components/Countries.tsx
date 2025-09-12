import type { ICountry } from "../types/countries"
import { Country } from "./Country"

interface Props{
    countries:ICountry[]
    handleSelectCountry: (country:ICountry) => void
}

export const Countries : React.FC<Props> = ({countries,handleSelectCountry}) => {    
    if(countries.length> 10 ){
        return (
        <section> 
        <p>To many countries to display</p>
        <p>Please specify another filter</p>
        </section>)
    }     
    
    if(countries.length > 1){
        return <ul style={{display:'flex',flexDirection:'column',rowGap:8}} >
        {countries.map((c) => (
            <article key={c.name.common} style={{display:'flex',gap:10,alignItems:'center'}}>
            <li style={{listStyleType:'-moz-initial'}}>{c.name.common}</li>
            <button type="button" onClick={() => handleSelectCountry(c)}>Show</button>
            </article>))}
        </ul>
    } 

    if (countries.length === 1){
        return <Country country={countries[0]} />
    }
  }