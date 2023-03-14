import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APIHelper } from '../utils/APIHelper.js';
import {cacheKey,cacheDuration,now} from '../constants/constants.js';
import TopRightDivPurple from '../images/Top_right_div_purple.jpg';
import TopLeftDivPurple from '../images/Top_left_div_purple.jpg';
import TopRightDivGreen from '../images/Top_right_div_green.jpg';
import TopLeftDivGreen from '../images/Top_left_div_green.jpg';
import TopRightDivRed from '../images/Top_right_div_red.jpg';
import TopLeftDivRed from '../images/Top_left_div_red.jpg';
import TopRightDivBlue from '../images/Top_right_div_blue.jpg';
import TopLeftDivBlue from '../images/Top_left_div_blue.jpg';
import TopRightDivOrange from '../images/Top_right_div_orange.jpg';
import TopLeftDivOrange from '../images/Top_left_div_orange.jpg';
import bottomLeftImage from '../images/bottom_left_div.jpg';
import bottomCenterImage from '../images/bottom_center_div.jpg';
import bottomRightImage from '../images/bottom_right_div.jpg';
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
            weatherData && weatherData.list.map((weather, index) => <CardView weather={weather} index={index} setActiveCity={setActiveCity} />)
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

const CardView = ({ weather, index, setActiveCity }) => {
  return ((

    <Link to={`/${weather.name}`} onClick={() => {
      setActiveCity(weather);
    }}>
      <div>
      <div className="small_widget" key={index}>
          <div id = "flex">
            <div id="widget_col1" style={{
              backgroundImage: weather.weather[0].description === "overcast cloud" ? `url(${TopRightDivPurple})` :
                weather.weather[0].description === "clear sky" ? `url(${TopRightDivGreen})` :
                  weather.weather[0].description === "scattered clouds" ? `url(${TopRightDivPurple})` :
                    weather.weather[0].description === "broken clouds" ? `url(${TopRightDivPurple})` :
                      weather.weather[0].description === "mist" ? `url(${TopRightDivRed})` :
                        weather.weather[0].description === "few clouds" ? `url(${TopRightDivBlue})` :
                          weather.weather[0].description === "light rain" ? `url(${TopRightDivOrange})` :
                            `url(${TopRightDivBlue})`
            }}>
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
            <div id="widget_col2" style={{
              backgroundImage: weather.weather[0].description === "overcast cloud" ? `url(${TopLeftDivPurple})` :
                weather.weather[0].description === "clear sky" ? `url(${TopLeftDivGreen})` :
                  weather.weather[0].description === "scattered clouds" ? `url(${TopLeftDivPurple})` :
                    weather.weather[0].description === "broken clouds" ? `url(${TopLeftDivPurple})` :
                      weather.weather[0].description === "mist" ? `url(${TopLeftDivRed})` :
                        weather.weather[0].description === "few clouds" ? `url(${TopLeftDivBlue})` :
                          weather.weather[0].description === "light rain" ? `url(${TopLeftDivOrange})` :
                            `url(${TopLeftDivBlue})`
            }}>
              <div id="temp_div">
                {Math.round(parseInt(weather.main.temp))} &deg;C
              </div>
              <div id="temp_min_div">
                {`Temp Min:`} {Math.round(parseInt(weather.main.temp_min))} &deg;C
                <br />
                {`Temp Max:`}{Math.round(parseInt(weather.main.temp_max))} &deg;C
                <br />
              </div>
            </div>
          </div>
          <div id = "flex">
            <div id="widget_col3" style={{ backgroundImage: `url(${bottomLeftImage})`}}>
              <div id="pressure_div">
                Pressure: {parseInt(weather.main.pressure)} hPa <br /><br />
                Humidity:{parseInt(weather.main.humidity)} % <br /><br />
                Visibility:{parseInt(weather.visibility) / 1000} .0Km <br /><br />
              </div>
            </div>
            <div id="widget_col4" style={{ backgroundImage: `url(${bottomCenterImage})` }}>
              <div id="wind_div">
                {parseFloat(weather.wind.speed)} m/s {parseInt(weather.wind.deg)} Degree
              </div>
            </div>
            <div id="widget_col5" style={{ backgroundImage: `url(${bottomRightImage})`}}>
              <div id="sun_div">
                Sunrise: {timecal(new Date((weather.sys.sunrise) * 1000))}  <br /><br />
                Sunset: {timecal(new Date((weather.sys.sunset) * 1000))} <br /><br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>

  ))
}


export default Smallwidget;

