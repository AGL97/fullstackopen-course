import './App.css'
import { Countries } from './components/Countries'
import { Country } from './components/Country'
import { useCountries } from './hooks/useCountries'

function App() {
  const { countries,selectedCountry,isLoading,handleSelectCountry, searchCountries } = useCountries()

  return (
    <>
      <h1>Search</h1>
      <label htmlFor="searchCountries">Search Countries: </label>
      <input type="search" name="searchCountries" id="searchCountries" onChange={(e) => searchCountries(e.target.value)} />
      {isLoading ? <h3>Cargando...</h3>  : selectedCountry ?
       <Country country={selectedCountry} /> : 
       <Countries countries={countries} handleSelectCountry={handleSelectCountry}/>}
      <p>Countries founded: {countries.length}</p> 
    </>
  )
}

export default App
