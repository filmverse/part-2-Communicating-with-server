
import { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ query, setQuery ] = useState('')

  const dev = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(response.data)
      setCountries(response.data.map(cname => ({
        name: cname.name.common,
        capital: cname.capital,
        area: cname.area,
        language: cname.languages,
        flag: cname.flag,
        flags: cname.flags,
      })))
    })
  }

  useEffect(dev, [])

  // console.log(countries)
  // console.log(query)

  const handleChange = (event) => {
    setQuery(event.target.value.toLowerCase())
  }

  const filteredCountries = countries.filter(
    countrys => countrys.name.toLowerCase().includes(query)
  )

  return (
    <div>
      <p>find countries <input value={query} onChange={handleChange} /></p>

      <h1>Search Results</h1>

      {filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}

      {filteredCountries.length <= 10 && filteredCountries.length > 1 && filteredCountries.map(
        country => (
          <div key={country.name}>
            name:{country.name}<br />
            capital:{country.capital}<br />
            area:{country.area}<br />
            flag:{country.flag}
          </div>
        )
      )}

      {filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}

      <h1>Countries</h1>

      {countries.map((country) => <p key={country.name}>name:{country.name}<br />capital:{country.capital}<br />area:{country.area}<br />flag:{country.flag}</p>)}
    </div>
  )
}

export default App;