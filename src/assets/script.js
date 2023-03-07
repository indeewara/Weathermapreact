
const cacheKey = 'weatherData';
let cachedData = localStorage.getItem(cacheKey);
const now = new Date().getTime()


function WeatherDataCache(){
  

  cachedData = JSON.parse(cachedData);



if(cachedData && now - cachedData.cacheTime < 300000){
    showweather(cachedData.weatherArray); 

 }else{
 WeatherData();
}

}

 function WeatherData(){

  fetch('cities.json')
  .then(response => response.json())
  .then(data => {
    const obj = data;

    const arr = Object.values(obj);
  
    let city = arr[0][0];    
    const CityCodes = [];
    for (let i = 0; i < arr[0].length; i++) {

      CityCodes.push(arr[0][i].CityCode);


    }
    
    return CityCodes;
  })
  .then(async CityCodes => {
    const weatherArray = [];
    for (let i = 0; i < CityCodes.length; i++) {
      id=CityCodes[i]+",";
      let weatherData= await renderWeather(id);
      weatherArray.push(weatherData);
    }
    
   showweather(weatherArray);
   localStorage.setItem(cacheKey, JSON.stringify({ weatherArray, cacheTime: now }));
   console.log("weatherArray",weatherArray);

  
});

}


async function renderWeather(id) {

      let data = await fetchWeather(id);
      CityName = JSON.stringify(data.list[0].name);
      let timezoneOffset = data.list[0].sys.timezone; 
      let date = new Date();
      date.setTime(date.getTime() + timezoneOffset * 1000);
  
        var weatherData = {
          cityName: data.list[0].name,
          temp: Math.round(parseInt(data.list[0].main.temp)),
          maxTemp: Math.round(parseInt(data.list[0].main.temp_max)),
          minTemp: Math.round(parseInt(data.list[0].main.temp_min)),
          pressure: parseInt(data.list[0].main.pressure),
          humidity: parseInt(data.list[0].main.humidity),
          visibility: parseInt(data.list[0].visibility) / 1000,
          windSpeed: parseFloat(data.list[0].wind.speed),
          windDegree: parseInt(data.list[0].wind.deg),
          sunrise: timecal(new Date((data.list[0].sys.sunrise) * 1000)),
          sunset: timecal(new Date((data.list[0].sys.sunset) * 1000)),
          Country:data.list[0].sys.country,
          currentTime: timecal(date),
          currentDate: datecal(date),
          weatherDes: data.list[0].weather[0].description,
          weatherIcon: data.list[0].weather[0].icon,
        };
      
      return weatherData;   
  }
     
async function fetchWeather(id) {
  try {

     const response = await fetch(`http://api.openweathermap.org/data/2.5/group?id=${id}&units=metric&appid=5c4de2c618fa3cbf2a018fa424993520`, {
          method: 'GET',
          credentials: 'same-origin'
      });

      const weather = await response.json();
      return weather;

  } catch (error) {
     
  }
}


function timecal(date){
  let hours = date.getHours();
      let minutes = date.getMinutes();
      minutes = minutes < 10 ? '0' + minutes : minutes; 
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; 

      let time = hours + ':' + minutes + ' ' + ampm.toLowerCase();

      return time;

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



