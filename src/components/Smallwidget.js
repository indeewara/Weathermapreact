import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APIHelper } from '../utils/APIHelper.js';
import {cacheKey,cacheDuration,now} from '../constants/constants.js';
import { Link } from "react-router-dom";
import Header from './Header'

const ImageUrl = process.env.REACT_APP_IMAGE_URL;

function Smallwidget({ setActiveCity }) {
  const [cities, setCities] = useState([]);
  const [cityCodes, setCityCodes] = useState([]);

  async function fetchCities() {
    try {
      const response = await axios.get('cities.json');
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    const obj = cities;
    const arr = Object.values(obj);
    cityArray(arr);
  }, [cities]);

  async function cityArray(arr) {
    if (arr.length === 0) {
      return;
    }
    let newCityCodes = [];
    for (let i = 0; i < arr[0].length; i++) {
      newCityCodes.push(arr[0][i].CityCode);
     }
    setCityCodes(newCityCodes);
  }

  useEffect(() => {
    if (cityCodes.length > 0) {
      fetchWeather(cityCodes);
    }
  }, [cityCodes]);

  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeather(idList) {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (now - parsedData.cacheTime < cacheDuration) {
        setWeatherData(parsedData.data);
        return;
      }
    }
    try {
      const response = await APIHelper(idList);
      setWeatherData(response.data);
      localStorage.setItem(cacheKey, JSON.stringify({ data: response.data, cacheTime: now }));
  } catch (error) {

    }
  }




  return (
<div id ="wrapper" >
    <Header />
    <div id="small-widget">
       <div className="weather_widget_container">
        <div className="weather_widget">
          {
            weatherData && weatherData.list.map((weather, index) => <CardView weather={weather} key={index} setActiveCity={setActiveCity} />)
          }
        </div>
      </div>
    </div>
    </div>
  );
}


function timecal(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
 let time = hours + ':' + minutes + ' ' + ampm.toLowerCase();
 return time;
}

function datecal(date) {
  let options = {
    month: 'long',
    day: 'numeric'
  };
 return date.toLocaleDateString('en-US', options);
}

const CardView = ({ weather, setActiveCity }) => {
  return ((

    <Link className="info_link" to={`/${weather.name}`} onClick={() => {
      setActiveCity(weather);
    }}>
      <div className="small_widget">
        <div id="flex" className="flex_header" style={{ backgroundColor: getBackgroundColor(weather.weather[0].description)}}>
            <div id="widget_col1">
              <div id ="city_div">
                {weather.name},{weather.sys.country}
              </div>
              <div id="time_div">
                {timecal(new Date())}, {datecal(new Date())}
              </div>
              <div id= "icon_div">
                <img src={`${ImageUrl}/${weather.weather[0].icon}.png`} alt="Example" />
                {weather.weather[0].description}
              </div>
            </div>
            <div id="widget_col2">
              <div id="cross_mark"> &#x00D7;</div>
              <div id="temp_div">
                {Math.round(parseInt(weather.main.temp))} &deg;c
              </div>
              <div id="temp_min_div">
                {`Temp Min:`} {Math.round(parseInt(weather.main.temp_min))} &deg;C
                <br />
                {`Temp Max:`}{Math.round(parseInt(weather.main.temp_max))} &deg;C
                <br />
              </div>
            </div>
          </div>
          <div id = "flex" className="flex_footer">
            <div id="widget_col3" >
              <div id="pressure_div">
               <b> Pressure:</b> {parseInt(weather.main.pressure)} hPa <br />
               <b> Humidity:</b>{parseInt(weather.main.humidity)} % <br />
               <b>Visibility:</b>{parseInt(weather.visibility) / 1000} .0Km <br />
              </div>
            </div>
            <div id="widget_col4">
           
            <div id="arrow_head"></div>
              <div id="wind_div">
                {parseFloat(weather.wind.speed)} m/s {parseInt(weather.wind.deg)} Degree
              </div>
              <div id="rectangle_left"></div>
              <div id="rectangle_right"></div>
            </div>
            <div id="widget_col5" >
              <div id="sun_div">
                <b>Sunrise:</b> {timecal(new Date((weather.sys.sunrise) * 1000))}  <br />
                <b>Sunset:</b> {timecal(new Date((weather.sys.sunset) * 1000))} <br />
              </div>
            </div>
          </div>
        </div>
    </Link>

  ))
}

function getBackgroundColor(description) {
  let background;
  
  switch (description) {
    case "overcast cloud":
      background = "#6149cb";
      break;
    case "clear sky":
      background = "#40b681";
      break;
    case "scattered clouds":
    case "broken clouds":
      background = "#6149cb";
      break;
    case "mist":
      background = "#9c3939";
      break;
    case "few clouds":
      background = "#378de7";
      break;
    case "light rain":
      background = "#de934e";
      break;
    default:
      background = "#378de7";
  }
  
  return background;
}


// function getBackgroundLeft(description) {
//   let background;
  
//   switch (description) {
//     case "overcast cloud":
//       background = `url(${TopLeftDivPurple})`;
//       break;
//     case "clear sky":
//       background = `url(${TopLeftDivGreen})`;
//       break;
//     case "scattered clouds":
//     case "broken clouds":
//       background = `url(${TopLeftDivPurple})`;
//       break;
//     case "mist":
//       background = `url(${TopLeftDivRed})`;
//       break;
//     case "few clouds":
//       background = `url(${TopLeftDivBlue})`;
//       break;
//     case "light rain":
//       background = `url(${TopLeftDivOrange})`;
//       break;
//     default:
//       background = `url(${TopLeftDivBlue})`;
//   }
  
//   return background;
// }

export default Smallwidget;

