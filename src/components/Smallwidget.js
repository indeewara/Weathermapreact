import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const cacheKey = 'weatherDataCache';
const cacheDuration = 300000; // 5 minutes in milliseconds


function Smallwidget({setActiveCity}) {


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



  

  const now = Date.now();

  
  
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

      const response = await axios.get(`http://api.openweathermap.org/data/2.5/group?id=${idList}&units=metric&appid=5c4de2c618fa3cbf2a018fa424993520`);

       setWeatherData(response.data);
       localStorage.setItem(cacheKey, JSON.stringify({ data: response.data, cacheTime: now }));


    } catch (error) {

    }
  }





  return (
    
      <div id="small-widget">
        <Header />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "350px", paddingBottom: "50px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", maxWidth: "1500px", width: "100%", margin: "0 auto", padding: "20px" }}>
            {
              weatherData && weatherData.list.map((weather, index) => <CardView weather={weather} index={index} setActiveCity={setActiveCity} />)
            }
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


export default Smallwidget;


const CardView = ({ weather, index, setActiveCity }) => {
  return ((
    <Link to={`/${weather.name}`} onClick={()=>{
      setActiveCity(weather);
    }}>
      <div>
        

        <div key={{ index }} style={{ width: "100%", margin: "10px 0", paddingTop: "20px" }}>

          <div style={{ display: "flex" }}>
            <div style={{
              backgroundImage: weather.weather[0].description === "overcast cloud" ? `url(${TopRightDivPurple})` :
                weather.weather[0].description === "clear sky" ? `url(${TopRightDivGreen})` :
                  weather.weather[0].description === "scattered clouds" ? `url(${TopRightDivPurple})` :
                    weather.weather[0].description === "broken clouds" ? `url(${TopRightDivPurple})` :
                      weather.weather[0].description === "mist" ? `url(${TopRightDivRed})` :
                        weather.weather[0].description === "few clouds" ? `url(${TopRightDivBlue})` :
                          weather.weather[0].description === "light rain" ? `url(${TopRightDivOrange})` :
                            `url(${TopRightDivBlue})`, width: "299px",
              height: "217px",
              float: "right",
              borderRadius: "10px 0 0 0",
            }}
            >
              <div style={{
                position: "relative",
                top: "50px", left: "80px",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "170%",
                color: "aliceblue",
              }} name="cityname">
                {weather.name},{weather.sys.country}
              </div>
              <div style={{
                position: "relative",
                top: "60px", left: "100px",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "70%", color: "aliceblue",
              }} name="dateandtime"
              >
                {timecal(new Date())}, {datecal(new Date())}
              </div>
              <div style={{
                position: "relative",
                top: "80px",
                left: "140px",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "120%",
                color: "aliceblue",
              }} name="dateandtime">
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Example" />
                {weather.weather[0].description}
              </div>
            </div>
            <div style={{
              backgroundImage: weather.weather[0].description === "overcast cloud" ? `url(${TopLeftDivPurple})` :
                weather.weather[0].description === "clear sky" ? `url(${TopLeftDivGreen})` :
                  weather.weather[0].description === "scattered clouds" ? `url(${TopLeftDivPurple})` :
                    weather.weather[0].description === "broken clouds" ? `url(${TopLeftDivPurple})` :
                      weather.weather[0].description === "mist" ? `url(${TopLeftDivRed})` :
                        weather.weather[0].description === "few clouds" ? `url(${TopLeftDivBlue})` :
                          weather.weather[0].description === "light rain" ? `url(${TopLeftDivOrange})` :
                            `url(${TopLeftDivBlue})`, width: "280px", height: "217px", float: "left", borderRadius: "0 10px 0 0",
            }}>
              <div style={{ position: "relative", top: "45px", left: "80px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "340%", color: "aliceblue", }} name="cityname">
                {Math.round(parseInt(weather.main.temp))} &deg;C
              </div>
              <div style={{ position: "relative", top: "60px", left: "80px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "80%", color: "aliceblue", }} name="dateandtime">
                {`Temp Min:`} {Math.round(parseInt(weather.main.temp_min))} &deg;C
                <br />
                {`Temp Max:`}{Math.round(parseInt(weather.main.temp_max))} &deg;C
                <br />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div
              style={{
                backgroundImage: `url(${bottomLeftImage})`,
                width: '211px',
                height: '151px',
                float: 'left',
                borderRadius: '0 0 0 10px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  top: '30px',
                  left: '50px',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '90%',
                  color: 'aliceblue',
                }}
                name="dateandtime"
              >
                Pressure: {parseInt(weather.main.pressure)} hPa <br /><br />
                Humidity:{parseInt(weather.main.humidity)} % <br /><br />
                Visibility:{parseInt(weather.visibility) / 1000} .0Km <br /><br />
              </div>
            </div>
            <div
              style={{
                backgroundImage: `url(${bottomCenterImage})`,
                width: '176px',
                height: '151px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  top: '85px',
                  left: '30px',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '90%',
                  color: 'aliceblue',
                }}
                name="dateandtime"
              >
                {parseFloat(weather.wind.speed)} m/s {parseInt(weather.wind.deg)} Degree
              </div>
            </div>
            <div
              style={{
                backgroundImage: `url(${bottomRightImage})`,
                width: '192px',
                height: '151px',
                float: 'right',
                borderRadius: '0 0 10px 0',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  top: '50px',
                  left: '55px',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '90%',
                  color: 'aliceblue',
                }}
                name="dateandtime"
              >
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