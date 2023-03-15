import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
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

  return (
    <div>
      <HeaderText />
      <div className="container text-center" id="info_container">
        <div className="row" id="row_header" style={{ backgroundColor: getBackgroundColor(activeCity.weather[0].description)}}>
          <div className="col" id="col">
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
        <div className="row"  style={{ backgroundColor: getBackgroundColor(activeCity.weather[0].description)}}>
          <div className="col" id="col2">
          <div id="rectangle_center_info"></div>
            <div id="weather_Icon">              <img src={`${ImageUrl}/${activeCity.weather[0].icon}.png`} id="weather_img" alt="Weather Icon" ></img>
            </div>
            <div id='description_info'>
              {activeCity.weather[0].description}
            </div>
          </div>
          <div className="col" id='col3'>
            <div id="temp_info" >
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
        <div className="row" id="row_footer">
          <div className="col" id="col4">
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
          <div className="col" id="col5">
          <div id="arrow_head_info"></div>
            <div id="wind_info">
              {parseFloat(activeCity.wind.speed)}m/s  {parseInt(activeCity.wind.deg)} Degree
            </div>
          </div>
          <div className="col" id="col6">
          <div id="rectangle_left_info"></div>
              <div id="rectangle_right_info"></div>
            <div id="sunrise_info" name="sunrise">
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

export default CityWidget