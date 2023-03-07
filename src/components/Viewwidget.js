import Modal from './Modal';
import Backdrop from './Backdrop';
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
import { Link } from 'react-router-dom';





{/* <Link to={{ pathname: '/my-route', search: `?myData=${myData}` }}>Go to my route</Link> */}




function Smallwidget(){


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
  
async function cityArray(arr){
  let newCityCodes = [];

for (let i = 0; i < arr[0].length; i++) {
  newCityCodes.push(arr[0][i].CityCode);
}

setCityCodes(newCityCodes);
}

const [weatherData, setWeatherData] = useState(null);

useEffect(() => {
  fetchWeather(cityCodes)
}, [cityCodes]);

async function fetchWeather(id) {
  try {

    const response = await axios.get(`http://api.openweathermap.org/data/2.5/group?id=${id}&units=metric&appid=5c4de2c618fa3cbf2a018fa424993520`);


    setWeatherData(response.data);
    return weatherData;

  } catch (error) {
     
  }
}




const [modalIsOpen , setModalIsOpen] = useState(false); 
function deleteHandler(){
  setModalIsOpen(true);

}
function closeModalhandler(){
  setModalIsOpen(false);

}



return(
  <div>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", maxWidth: "1500px", width: "100%" }}>
  {weatherData && weatherData.list.map((weather, index) => (
<div>
  <div key={{index}} style={{ width: "100%", margin: "10px 0" }}>
  <a href="http://localhost:3000/View.js">
<div style={{ display: "flex" }}>
        <div style={{
           backgroundImage: weather.weather[0].description === "overcast cloud" ? `url(${TopRightDivPurple})` :
             weather.weather[0].description === "clear sky" ? `url(${TopRightDivGreen})` :
             weather.weather[0].description === "scattered clouds" ? `url(${TopRightDivPurple})` :
             weather.weather[0].description === "broken clouds" ? `url(${TopRightDivPurple})` :
             weather.weather[0].description === "mist" ? `url(${TopRightDivRed})` :
             weather.weather[0].description === "few clouds" ? `url(${TopRightDivBlue})` :
             weather.weather[0].description === "light rain" ? `url(${TopRightDivOrange})` :
             `url(${TopRightDivBlue})`,			width: "299px",
			height: "217px", 
			float: "right",
			borderRadius: "10px 0 0 0",
		}}
		>
          <div style={{
			position: "relative",
			top: "50px",left: "80px",
			fontFamily: "Arial, Helvetica, sans-serif",
			fontSize: "170%",
			color: "aliceblue",
		    }} name="cityname">
          {weather.name}
          </div>
          <div style={{
			 position: "relative",
			 top: "60px",left: "100px",
			 fontFamily: "Arial, Helvetica, sans-serif",
			 fontSize: "70%",color: "aliceblue", 
			}} name="dateandtime"
			>
           { timecal(new Date())}, { datecal(new Date())}
          </div>
          <div style={{
			position: "relative",
			top: "80px",
			left: "140px",
			fontFamily: "Arial, Helvetica, sans-serif",
			fontSize: "120%",
			color: "aliceblue",}}name="dateandtime">
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
            `url(${TopLeftDivBlue})` ,width: "280px",height: "217px",float: "left",borderRadius: "0 10px 0 0",}}>
          <div style={{ position: "relative", top: "45px",left: "80px", fontFamily: "Arial, Helvetica, sans-serif",fontSize: "340%",color: "aliceblue", }}name="cityname">
          {Math.round(parseInt(weather.main.temp))} &deg;C 
          </div>
          <div style={{position: "relative",top: "60px",left: "80px",fontFamily: "Arial, Helvetica, sans-serif",fontSize: "80%",color: "aliceblue",}}name="dateandtime">
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
          Humidity:{ parseInt(weather.main.humidity)} % <br /><br />
          Visibility:{ parseInt(weather.visibility) / 1000} .0Km <br /><br />
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
          { parseFloat(weather.wind.speed)} m/s { parseInt(weather.wind.deg)} Degree
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
          Sunrise: { timecal(new Date((weather.sys.sunrise) * 1000))}  <br /><br />
          Sunset: { timecal(new Date((weather.sys.sunset) * 1000))} <br /><br />
        </div>
      </div>
    </div>
    </a>
	</div>
  
  
   
  
  

  <br></br>
 

  <div className="action">
  <button variant="btn" onClick={deleteHandler}>Delete</button>

  
    </div>

    {modalIsOpen && <Modal onCancel = {closeModalhandler} onConfirm={closeModalhandler} /> }
    {modalIsOpen &&  <Backdrop onCancel = {closeModalhandler}/>}  
    </div>
   //if model open is true then show Backdrop 
   ))}
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


export default Viewwidget;