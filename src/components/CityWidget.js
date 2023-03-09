import React from 'react'
import { useParams , useNavigate, Link} from 'react-router-dom';
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
import BottomLeftDiv from  "../images/Bottom_Left_Div_2.jpg";
import BottomCenterDiv from  "../images/Bottom_Center_Div_2.jpg";
import BottomRightDiv from   "../images/Bottom_Right_Div_2.jpg";
import HeaderText from './HeaderText'
import back from '../images/back.png'







const CityWidget = ({activeCity}) => {
    const params = useParams()
    const navigate = useNavigate();
    const name = params["city_name"];


    if(!activeCity ){
        navigate('/');
        return <div/>
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
  }else{
    Top_right_div = TopRightBlue;
    Top_left_div = TopLeftBlue;
    Center_div = CenterBlue;

  }
  return (
<div>

<HeaderText/>


    <div className="container text-center" style={{paddingTop: "200px", paddingBottom:"200px"}}>

<div className="row">
      <div className="col" style={{backgroundImage: `url(${Center_div})`, backgroundPosition: 'cover', width: '500px', height: '190px', float: 'right', margin: 'auto', borderRadius: '0 10px 0 0', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <Link to={`/`}>
          <div style={{position: 'relative', top: '10px', left: '-10px', backgroundImage: `url(${back})`, backgroundSize: 'cover', width: '20px', height: '20px'}}> </div>
        </Link>
        <div style={{position: 'relative', top: '60px', left: '-20px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '250%', color: 'aliceblue'}} name="cityname">
          <b>{activeCity.name}, {activeCity.sys.country}</b>
        </div>
        <div style={{position: 'relative', top: '50px', left: '-20px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '100%', color: 'aliceblue'}} name="Date">
          {timecal(new Date())}, {datecal(new Date())}
        </div>
      </div>
    </div>



<div className="row">
      <div className="col" style={{backgroundImage: `url(${Top_right_div})`, width: '100%', height: '201px',backgroundPosition: 'left',backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div style={{position: 'relative', top: '0px', left: '150px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '100%', color: 'aliceblue'}} name="Icon">
          <img src={`http://openweathermap.org/img/wn/${activeCity.weather[0].icon}.png`} alt="Weather Icon" style={{width: '100px', height: '100px'}}></img>
        </div>
        <div style={{position: 'relative', top: '0px', left: '150px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '120%', color: 'aliceblue'}} name="Wed">
          {activeCity.weather[0].description}
        </div>
      </div>
      <div className="col" style={{backgroundImage: `url(${Top_left_div})`, width: '100%', height: '201px', backgroundPosition: '-50px'}}>
        <div style={{position: 'relative', top: '0px', left: '-250px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '350%', color: 'aliceblue'}} name="Temp">
          {Math.round(parseInt(activeCity.main.temp))}°c
        </div>
        <div style={{position: 'relative', top: '0px', left: '-250px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '120%', color: 'aliceblue'}} name="Mintemp">
          Temp Min: {Math.round(parseInt(activeCity.main.temp_min))}°c
        </div>
        <div style={{position: 'relative', top: '0px', left: '-250px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '120%', color: 'aliceblue'}} name="Maxtemp">
          Temp Max: {Math.round(parseInt(activeCity.main.temp_max))}°c
        </div>
      </div>
    </div>



<div className="row">
	
<div className="col" style={{backgroundImage: `url(${BottomLeftDiv})`, width: '100%', height: '206px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>

  <div style={{position: 'relative', top: '65px', left: '10px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '120%', color: 'aliceblue'}} name="Pressure">
    <b>Pressure</b> :{parseInt(activeCity.main.pressure)}hPa
  </div>
  <div style={{position: 'relative', top: '65px', left: '10px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '120%', color: 'aliceblue'}} name="Hum">
  <b> Humidity</b> :{parseInt(activeCity.main.humidity)}%
  </div>
  <div style={{position: 'relative', top: '65px', left: '10px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '120%', color: 'aliceblue'}} name="Vis">
  <b> Visibility</b> :{parseInt(activeCity.visibility) / 1000}km
  </div>
</div>



<div className="col" style={{backgroundImage: `url(${BottomCenterDiv})`, width: "100%", height: "206px",backgroundPosition: 'center'}}>
    <div style={{position: "relative", top: "105px", left: "-10px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "120%", color: "aliceblue"}} name="Wind">
        {parseFloat(activeCity.wind.speed)}m/s  {parseInt(activeCity.wind.deg)} Degree
    </div>
</div>



<div className="col" style={{backgroundImage: `url(${BottomRightDiv})`, width: "100%", height: "206px", borderRadius: "0 0 10px 0",backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
    <div style={{position: "relative", top: "65px", left: "10px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "120%", color: "aliceblue"}} name="sunrise">
       <b> Sunrise</b>: {timecal(new Date((activeCity.sys.sunrise) * 1000))}
    </div>
    <div style={{position: "relative", top: "65px", left: "10px", fontFamily: "Arial, Helvetica, sans-serif", fontSize: "120%", color: "aliceblue"}} name="sunset">
    <b> Sunset</b>: {timecal(new Date((activeCity.sys.sunset) * 1000))}
    </div>
</div>

</div>

</div>

</div>

  );
}

export default CityWidget