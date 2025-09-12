import React, { useEffect, useState } from 'react'
import { Strings } from '../helpers/Strings'
import wheaterService from '../services/wheater/wheater.service'
import type { ICountry } from '../types/countries'
import type { IWheater } from '../types/wheater'

interface Props{
    country:ICountry
}

export const Country : React.FC<Props> = ({country}) => {
  const { name, capital, area, languages, flags } = country

  const [weather, setWeather] = useState<IWheater>()
  
  console.log('Wheater capittal',JSON.stringify(weather,null,2))
  

  const getWeather = async () => {
    try {
      if(!country.capital){
        throw new Error('Country has no capital')
      }
      const weather = await wheaterService.getWeather(Strings.capitalize(country.capital[0]))
      setWeather(weather)
    } catch (error) {
      if(error instanceof Error){
        alert(error.message)
        console.log(error.message)        
      }
    }
  }

  useEffect(() => {
    getWeather()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  return (
    <section>
      <h1>{name.common}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      {languages && 
      <section>      
      <h2>Languages</h2>
      <ul>
        {Object.entries(languages).map(([key,value]) => 
        <li key={key}>
          <p>{Strings.capitalize(value)}</p>
        </li>
        )}        
      </ul>
      <img src={flags.png} alt={flags.alt} sizes="300" />

      {weather && <section>
        <h3>Weather</h3>
        <p>Temperature: {weather.main.temp} °C</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} sizes="120" />
        <p>Wind: {weather.wind.speed} m/s</p>
      </section>}

      </section>}
    </section>
  )
}
