import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { BarChart,Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css'

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [countryList, setCountryList] = useState([]);
  const [avgGDP, setAvgGDP] = useState(0);
  const [highPopCountry, setPopCountry] = useState({'name': '', 'value':0});
  const [lowUnempRate, setUnempRate] = useState({'name': '', 'value':0});

  const apiCall = async (query) => { 
    const response = await fetch("https://api.api-ninjas.com/v1/country?limit=30"+query, {headers: {"X-Api-Key" : API_KEY}});
    const data = await response.json();
    setCountryList(data);
  }

  
  useEffect(() => {
    apiCall("");
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

  function getSearchQuery(){
     var country_name = (document.getElementById('country_name').value).toLowerCase();
     var unemployment_rate = document.getElementById('eRateOutput').value;

     apiCall(`&name=${country_name}&max_unemployment=${unemployment_rate}`);
     
  }

  return (
    <>
    <div className='app'>
       <div className='header'>
            <h1>Geographic Dashboard 🌎</h1>
            <div className='container'>
                <div className='stat-item'>
                    <h3>Average GDP 💰 </h3>
                    <h4>{avgGDP} USD</h4> 
                </div>

                <div className='stat-item'>
                     <h3>Highest Population 🧑🏽‍🤝‍🧑🏽</h3> 
                     <h4>{(highPopCountry.name)?(highPopCountry.name):("Unavailable")} : {highPopCountry.value}K</h4>
                </div>

                <div className='stat-item'>
                     <h3>Lowest Unemployment 🏭</h3> 
                     <h4>{(lowUnempRate.name)?(`${lowUnempRate.name} : ${lowUnempRate.value}%`):("Unavailable")}</h4>
                </div>

            </div>

            <div className='filter-area'>
               <input type="text" id="country_name" placeholder='Search any country'/> 
               <div className='unemployment-slider'>
                 <label>Maximum Unemployment Rate: </label>
                 <input type="range" id="unempRateBar" name="eRateBar" min="0" max="30" step="2" onChange={(e)=>{document.getElementById('eRateOutput').innerHTML = e.target.value;} }/>
                 <output htmlFor="eRateBar" id="eRateOutput"> 30 </output>
               </div>

               <button type='submit' id='search-button' onClick={getSearchQuery}>Search 🔍</button>
            </div>
            
            
       </div>

       <div className='main-panel'>
            <div className='result-area'>
            <table>
                  <thead>
                   <tr>
                     <th>Country Name</th>
                     <th>GDP</th>
                     <th>Currency</th>
                     <th>Population</th>
                     <th>Unemployment Rate</th>
                     <th>More Details</th>
                   </tr>
                  </thead>
                  
                  <tbody>
                  { countryList && 
                    countryList.map((c) => {
                     var gdp, curr, pop, uneRate;
                     
                     if(c["gdp"]) {gdp = c['gdp'];}  else {gdp="Unavailable";}
                     if(c["currency"]['name']) {curr = c['currency']['name'];}  else {curr="Unavailable";}
                     if(c["population"]) {pop = c['population'] + "K";}  else {pop="Unavailable";}
                     if(c["unemployment"]) {uneRate = c['unemployment'] + "%";}  else {uneRate="Unavailable";}
                  
                     return(
                      
                        <tr key={c.name}>
                         <td>{c["name"]}</td>
                         <td>{gdp}</td>
                         <td>{curr}</td>
                         <td>{pop}</td>
                         <td>{uneRate}</td>
                         <td> <Link to={`/countryDetails/${c["name"]}`} key={c["name"]}> 🔗 </Link> </td>
                       </tr>
                      
                      ) 
                    })
                  }
                  </tbody>
                </table>
             </div>

             <div className='chart-area'>
               <BarChart 
                  width={600}
                  height={400} 
                  data={countryList && countryList.map((c) => {
                      return {name: c.name, unemployed: Math.round((c["unemployment"]) ? ((c.unemployment/ 100) * c.population) : (null)), population: c.population}
                  })} 
                  margin={{
                   top: 5,
                   right: 30,
                   left: 20,
                   bottom: 5
                 }}
               >
                   <CartesianGrid strokeDasharray={"3 3"}/>
                   <XAxis dataKey="name" />
                   <YAxis />
                   <Tooltip />
                   <Legend />
                  
                   <Bar dataKey="population" fill="#1e7fd9" />
                   <Bar dataKey="unemployed" fill="#FF5733" />
               </BarChart>
            </div>

            </div>
       </div>

       
    </>
  )
}

export default App
