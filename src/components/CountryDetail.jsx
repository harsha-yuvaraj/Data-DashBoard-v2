import React, {Component, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CountryDetail = () => {
    let params = useParams();
    const [info, setInfo] = useState([]);

    const apiCall = async (query) => { 
        const response = await fetch("https://api.api-ninjas.com/v1/country?limit=1"+query, {headers: {"X-Api-Key" : API_KEY}});
        const data = await response.json();
        setInfo(data);
      }

    useEffect(()=>{
        apiCall(`&name=${params.name}`).catch(console.error);
    }
    , []);

    return (
        <>
            <h1>{(info.length!=0)?(info[0].name):("Loading...")}</h1>
            <br />

            {info.length!=0 &&
                 ( 
                   <>
                     <h3>Region 🌏:  {(info[0]["region"])?(info[0]["region"]):("Unavailable 😔")}</h3>
                     <h3>Capital 🏛️: {(info[0]["capital"])?(info[0]["capital"]):("Unavailable 😔")}</h3>
                     <h3>Surface Area 🏞️:  {(info[0]["surface_area"])?(info[0]["surface_area"] + " square km"):("Unavailable 😔")}</h3>
                     <h3>Carbon Dioxide Emissions 🏭:  {(info[0]["co2_emissions"])?(info[0]["co2_emissions"] + " kt"):("Unavailable 😔")}</h3>
                     <h3>Currency 🪙: {(info[0]["currency"]['name'])?(info[0]["currency"]['name'] + ` (${(info[0]["currency"]['code']) ? (info[0]["currency"]['code']) : ('Symbol Unknown')})`):("Unavailable 😔")}</h3>
                     <h3>GDP 📈:  {(info[0]["gdp"])?(info[0]["gdp"] + " USD"):("Unavailable 😔")}</h3>
                     <h3>Unemployment Rate 🧑‍💼:  {(info[0]["unemployment"])?(info[0]["unemployment"] + "%"):("Unavailable 😔")}</h3>
                     <h3>Fertility Rate 🤰:  {(info[0]["fertility"])?(info[0]["fertility"] + "%"):("Unavailable 😔")}</h3>
                     <h3>Sex Ratio 🚻:  {(info[0]["sex_ratio"])?(info[0]["sex_ratio"] + "%"):("Unavailable 😔")}</h3>
                     <h3>Homicide Rate 💀:  {(info[0]["homicide_rate"])?(info[0]["homicide_rate"] + "%"):("Unavailable 😔")}</h3>
                     <h3>Internet Users 🌐:  {(info[0]["internet_users"])?(info[0]["internet_users"] + "%"):("Unavailable 😔")}</h3>


                   </>
                 )
                 
            }
        </>
    )
}

export default CountryDetail;

