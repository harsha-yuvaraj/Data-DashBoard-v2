import { useEffect, useState } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [countryList, setCountryList] = useState([]);
  const [avgGDP, setAvgGDP] = useState(0);
  const [highPopCountry, setPopCountry] = useState({'name': '', 'value':0});
  const [airPollution, setAirPollution] = useState({'name': '', 'value':0});
  
  useEffect(() => {
    const apiCall = async () => { 
       const response = await fetch("https://api.api-ninjas.com/v1/country?limit=15", {headers: {"X-Api-Key" : API_KEY}});
       const data = await response.json();
       setCountryList(data);
    }

    apiCall();
  }, [])

  useEffect(()=>{
     calcAvgGDP();
     calcHighestPopulationDensity();
     calcHighestAirQuality();
  },[countryList])

  function calcAvgGDP() {
    var xbar = 0;

    countryList.forEach((c) => xbar+=(c["gdp"])?(c["gdp"]):(0));
    setAvgGDP((xbar/countryList.length).toFixed(2));
  }

  function calcHighestPopulationDensity() {
    var hDen = 0, hName = ""; 
    
    countryList.forEach((c) => {
                                    if(c["pop_density"] && c["pop_density"] > hDen){
                                          hDen = c["pop_density"];
                                          hName = c["name"];
                                    }
                                });

    setPopCountry({'name':hName, 'value':hDen});

  }

  function calcHighestAirQuality() {
    var lEmvalue = Number.MAX_VALUE, name = ""; 
    
    countryList.forEach((c) => {
                                    if(c["co2_emissions"] && c["co2_emissions"] < lEmvalue){
                                          lEmvalue = c["co2_emissions"];
                                          name = c["name"];
                                    }
                                });

    setAirPollution({'name':name, 'value':lEmvalue});
  }

  return (
    <>
       <div className='header'>
            <h1>Geographic Dashboard 🌎</h1>
            <div className='stat-area'>
                <div className='stat-item'>
                    <h3>Average GDP 💰 </h3>
                    <h4>{avgGDP}</h4> 
                </div>

                <div className='stat-item'>
                     <h3>Highest Population Density 🧑🏽‍🤝‍🧑🏽</h3> 
                     <h4>{highPopCountry.name} : {highPopCountry.value}</h4>
                </div>

                <div className='stat-item'>
                     <h3>Lowest CO₂ emissions (kt) 🏭</h3> 
                     <h4>{airPollution.name} : {airPollution.value}</h4>
                </div>

            </div>
       </div>
    </>
  )
}

export default App
