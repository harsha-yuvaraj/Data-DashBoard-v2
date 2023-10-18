import { useEffect, useState } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [countryList, setCountryList] = useState([]);
  const [avgGDP, setAvgGDP] = useState(0);
  const [highPopCountry, setPopCountry] = useState({'name': '', 'value':0});
  const [lowUnempRate, setUnempRate] = useState({'name': '', 'value':0});
  
  useEffect(() => {
    const apiCall = async () => { 
       const response = await fetch("https://api.api-ninjas.com/v1/country?limit=30", {headers: {"X-Api-Key" : API_KEY}});
       const data = await response.json();
       setCountryList(data);
       console.log("len:"+countryList.length);
    }

    apiCall();
  }, [])

  useEffect(()=>{
     calcAvgGDP();
     calcHighestPopulationDensity();
     calcUnempRate();
  },[countryList])

  function calcAvgGDP() {
    var xbar = 0;

    countryList.forEach((c) => xbar+=(c["gdp"])?(c["gdp"]):(0));
    setAvgGDP((xbar/countryList.length).toFixed(2));
  }

  function calcHighestPopulationDensity() {
    var hDen = 0, hName = ""; 
    
    countryList.forEach((c) => {
                                    if(c["population"] && c["population"] > hDen){
                                          hDen = c["population"];
                                          hName = c["name"];
                                    }
                                });

    setPopCountry({'name':hName, 'value':hDen});

  }

  function calcUnempRate() {
    var lEmvalue = Number.MAX_VALUE, name = ""; 
    
    countryList.forEach((c) => {
                                    if(c["unemployment"] && c["unemployment"] < lEmvalue){
                                          lEmvalue = c["unemployment"];
                                          name = c["name"];
                                    }
                                });

    setUnempRate({'name':name, 'value':lEmvalue});
  }

  return (
    <>
    <div className='app'>
       <div className='header'>
            <h1>Geographic Dashboard 🌎</h1>
            <div className='container'>
                <div className='stat-item'>
                    <h3>Average GDP 💰 </h3>
                    <h4>{avgGDP}</h4> 
                </div>

                <div className='stat-item'>
                     <h3>Highest Population 🧑🏽‍🤝‍🧑🏽</h3> 
                     <h4>{highPopCountry.name} : {highPopCountry.value}K</h4>
                </div>

                <div className='stat-item'>
                     <h3>Lowest Unemployment 🏭</h3> 
                     <h4>{lowUnempRate.name} : {lowUnempRate.value}%</h4>
                </div>

            </div>
            
       </div>

       <div className='main-panel'>
            <div className='container'>
                   <p>Filter Tools Coming... </p>
            </div>

            <div className='result-area'>
            <table>
                  <thead>
                   <tr>
                     <th>Country Name</th>
                     <th>GDP</th>
                     <th>Currency</th>
                     <th>Population</th>
                     <th>Unemployment Rate</th>
                     <th>Fertility Rate</th>
                   </tr>
                  </thead>
                  
                  <tbody>
                  { countryList && 
                    countryList.map((c) => {
                     var gdp, curr, pop, uneRate, ferRate;
                     
                     if(c["gdp"]) {gdp = c['gdp'];}  else {gdp="Unavailable";}
                     if(c["currency"]['name']) {curr = c['currency']['name'];}  else {curr="Unavailable";}
                     if(c["population"]) {pop = c['population'] + "K";}  else {pop="Unavailable";}
                     if(c["unemployment"]) {uneRate = c['unemployment'] + "%";}  else {uneRate="Unavailable";}
                     if(c["fertility"]) {ferRate = c['fertility'] + "%";}  else {ferRate="Unavailable";}
                  
                     return(
                      <tr>
                         <td>{c["name"]}</td>
                         <td>{gdp}</td>
                         <td>{curr}</td>
                         <td>{pop}</td>
                         <td>{uneRate}</td>
                         <td>{ferRate}</td>
                      </tr>) 
                      })
                  }
                  </tbody>
                </table>
            </div>
       </div>
      </div>
       
    </>
  )
}

export default App
