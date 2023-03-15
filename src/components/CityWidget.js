import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import TopLeftGreen from '../images/Top_Left_green_2.jpg';
import TopLeftBlue from '../images/Top_Left_Blue_2.jpg';
import TopLeftOrange from '../images/Top_Left_orange_2.jpg';
import TopLeftPurple from '../images/Top_Left_Purple_2.jpg';
import TopLeftRed from '../images/Top_Left_red_2.jpg';
import TopRightGreen from '../images/Top_Right_green_2.jpg';
import TopRightBlue from '../images/Top_Right_Blue_2.jpg';
import TopRightOrange from '../images/Top_Right_orange_2.jpg';
import TopRightPurple from '../images/Top_Right_Purple_2.jpg';
import TopRightRed from '../images/Top_Right_red_2.jpg';
import CenterGreen from '../images/Center_green_2.jpg';
import CenterBlue from '../images/Center_Blue_2.jpg';
import CenterOrange from '../images/Center_orange_2.jpg';
import CenterPurple from '../images/Center_Purple_2.jpg';
import CenterRed from '../images/Center_red_2.jpg';
import BottomLeftDiv from "../images/Bottom_Left_Div_2.jpg";
import BottomCenterDiv from "../images/Bottom_Center_Div_2.jpg";
import BottomRightDiv from "../images/Bottom_Right_Div_2.jpg";
import HeaderText from './HeaderText';

const ImageUrl = process.env.REACT_APP_IMAGE_URL;

const CityWidget = ({ activeCity }) => {
  const navigate = useNavigate();
 if (!activeCity) {
    navigate('/');
    return <div />
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


  let Top_right_div, Top_left_div, Center_div;

 if (activeCity.weather[0].description === 'overcast clouds') {
    Top_right_div = TopRightPurple;
    Top_left_div = TopLeftPurple;
    Center_div = CenterPurple;
  } else if (activeCity.weather[0].description === 'clear sky') {
    Top_right_div = TopRightGreen;
    Top_left_div = TopLeftGreen;
    Center_div = CenterGreen;
  } else if (activeCity.weather[0].description === 'scattered clouds') {
    Top_right_div = TopRightPurple;
    Top_left_div = TopLeftPurple;
    Center_div = CenterPurple;
  } else if (activeCity.weather[0].description === 'broken clouds') {
    Top_right_div = TopRightPurple;
    Top_left_div = TopLeftPurple;
    Center_div = CenterPurple;
  } else if (activeCity.weather[0].description === 'mist') {
    Top_right_div = TopRightRed;
    Top_left_div = TopLeftRed;
    Center_div = CenterRed;
  } else if (activeCity.weather[0].description === 'few clouds') {
    Top_right_div = TopRightBlue;
    Top_left_div = TopLeftBlue;
    Center_div = CenterBlue;
  } else if (activeCity.weather[0].description === 'light rain') {
    Top_right_div = TopRightOrange;
    Top_left_div = TopLeftOrange;
    Center_div = CenterOrange;
  } else {
    Top_right_div = TopRightBlue;
    Top_left_div = TopLeftBlue;
    Center_div = CenterBlue;
  }
  return (
    <div>
      <HeaderText />
      <div className="container text-center" id="info_container">
        <div className="row">
          <div className="col" id="col" style={{ backgroundImage: `url(${Center_div})` }}>
            <Link className="link_main" to={`/`}>
              <div id='arrow_icon'> &#x2190; </div>
            </Link>
            <div id="city_info">
              <b>{activeCity.name}, {activeCity.sys.country}</b>
            </div>
            <div id="time_info">
              {timecal(new Date())}, {datecal(new Date())}
            </div>
          </div>  
        </div>
        <div className="row">
          <div className="col" id="col2" style={{ backgroundImage: `url(${Top_right_div})` }}>
            <div id="weather_Icon">
              <img src={`${ImageUrl}/${activeCity.weather[0].icon}.png`} id="weather_img" alt="Weather Icon" ></img>
            </div>
            <div id='description_info'>
              {activeCity.weather[0].description}
            </div>
          </div>
          <div className="col" id='col3' style={{ backgroundImage: `url(${Top_left_div})` }}>
            <div id="temp_info" style={{}}>
              {Math.round(parseInt(activeCity.main.temp))}°c
            </div>
            <div id="temp_min_info">
              Temp Min: {Math.round(parseInt(activeCity.main.temp_min))}°c
            </div>
            <div id="temp_max_info">
              Temp Max: {Math.round(parseInt(activeCity.main.temp_max))}°c
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col" id="col4" style={{ backgroundImage: `url(${BottomLeftDiv})` }}>
            <div id="pressure_info">
              <b>Pressure</b> :{parseInt(activeCity.main.pressure)}hPa
            </div>
            <div id="humidity_info">
              <b> Humidity</b> :{parseInt(activeCity.main.humidity)}%
            </div>
            <div id="visibility_id">
              <b> Visibility</b> :{parseInt(activeCity.visibility) / 1000}km
            </div>
          </div>
          <div className="col" id="col5" style={{ backgroundImage: `url(${BottomCenterDiv})` }}>
            <div id="wind_info">
              {parseFloat(activeCity.wind.speed)}m/s  {parseInt(activeCity.wind.deg)} Degree
            </div>
          </div>
          <div className="col" id="col6" style={{ backgroundImage: `url(${BottomRightDiv})` }}>
            <div id="sunrise_info" style={{}} name="sunrise">
              <b> Sunrise</b>: {timecal(new Date((activeCity.sys.sunrise) * 1000))}
            </div>
            <div id="sunset_info">
              <b> Sunset</b>: {timecal(new Date((activeCity.sys.sunset) * 1000))}
            </div>
          </div>
        </div>
      </div>
    </div>
 );
}

export default CityWidget