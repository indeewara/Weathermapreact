import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Fetchweather(){


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
    console.log(arr);
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

console.log(weatherData);

// return (
//   <div>
//     {weatherData && weatherData.list.map((weather, index) => (
//       <div key={index}>
//         <p>{weather.name}</p>
//         <p>{Math.round(parseInt(weather.main.temp))} &deg;C</p>
//         <p>{Math.round(parseInt(weather.main.temp_max))} &deg;C</p>
//         <p>{Math.round(parseInt(weather.main.temp_min))} &deg;C</p>
//         <p>{parseInt(weather.main.pressure)} Pa</p>
//         <p>{ parseInt(weather.main.humidity)} Pa</p>
//         <p>{ parseInt(weather.visibility) / 1000}</p>
//         <p>{ parseFloat(weather.wind.speed)}</p>
//         <p>{ parseInt(weather.wind.deg)}</p>
//         <p>{ timecal(new Date((weather.sys.sunrise) * 1000))}</p>
//         <p>{ timecal(new Date((weather.sys.sunset) * 1000))}</p>
//         <p>{ weather.country}</p>
//         <p>{ timecal(new Date())}</p>
//         <p>{ datecal(new Date())}</p>
//         <p>{ datecal(new Date())}</p>
//         <p>{weather.weather[0].description}</p>
//         <p>{weather.weather[0].icon}</p>
//       </div>
//     ))}
//   </div>
// );
  
  }
export default Fetchweather;




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





  // const [idArray, setIdArray] = useState([]);

  // function WeatherData() {
  
  //   axios.get('cities.json')
  //     .then(response => response.data)
  //     .then(data => {
  //       const obj = data;
  
  //       const arr = Object.values(obj);
  
        // let city = arr[0][0];
        // const CityCodes = [];
        // for (let i = 0; i < arr[0].length; i++) {
  
        //   CityCodes.push(arr[0][i].CityCode);
  
        // }
  
  //       return CityCodes;
  //     })
  //     .then(async CityCodes => {
  //       const weatherArray = [];
  //       let id;
  //       for (let i = 0; i < CityCodes.length; i++) {
  //         id = CityCodes[i] + ",";
  //         let weatherData = await renderWeather(id);
  //         weatherArray.push(weatherData);
  //       }
  
      
  //       // localStorage.setItem(cacheKey, JSON.stringify({ weatherArray, cacheTime: now }));
  //       console.log("weatherArray", weatherArray);
  
  
  //     });
  
  // }
  
  
  // async function renderWeather(id) {
  
  //   let data = await fetchWeather(id);
  //   CityName = JSON.stringify(data.list[0].name);
  //   let timezoneOffset = data.list[0].sys.timezone;
  //   let date = new Date();
  //   date.setTime(date.getTime() + timezoneOffset * 1000);
  
  //   var weatherData = {
  //     cityName: data.list[0].name,
  //     temp: Math.round(parseInt(data.list[0].main.temp)),
  //     maxTemp: Math.round(parseInt(data.list[0].main.temp_max)),
  //     minTemp: Math.round(parseInt(data.list[0].main.temp_min)),
  //     pressure: parseInt(data.list[0].main.pressure),
  //     humidity: parseInt(data.list[0].main.humidity),
  //     visibility: parseInt(data.list[0].visibility) / 1000,
  //     windSpeed: parseFloat(data.list[0].wind.speed),
  //     windDegree: parseInt(data.list[0].wind.deg),
  //     sunrise: timecal(new Date((data.list[0].sys.sunrise) * 1000)),
  //     sunset: timecal(new Date((data.list[0].sys.sunset) * 1000)),
  //     Country: data.list[0].sys.country,
  //     currentTime: timecal(date),
  //     currentDate: datecal(date),
  //     weatherDes: data.list[0].weather[0].description,
  //     weatherIcon: data.list[0].weather[0].icon,
  //   };
  
  //   return weatherData;
  // }
  
  // async function fetchWeather(id) {
  //   try {
  
  //     const response = await axios.get(`http://api.openweathermap.org/data/2.5/group?id=${id}&units=metric&appid=5c4de2c618fa3cbf2a018fa424993520`, {
  //       credentials: 'same-origin'
  //     });
  
  //     const weather = response.data;
  //     return weather;
  
  //   } catch (error) {
  
  //   }
  // }


  // function timecal(date) {
  //   let hours = date.getHours();
  //   let minutes = date.getMinutes();
  //   minutes = minutes < 10 ? '0' + minutes : minutes;
  //   let ampm = hours >= 12 ? 'pm' : 'am';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12;
  
  //   let time = hours + ':' + minutes + ' ' + ampm.toLowerCase();
  
  //   return time;
  // }
  
  // function datecal(date) {
  //   let options = {
  //     month: 'long',
  //     day: 'numeric'
  //   };
  
  //   return date.toLocaleDateString('en-US', options);
  // }
  
  
  
  
  
  



  // const [isLoading, setIsLoading] = useState(true);

  // async function fetchWeatherData() {
  //   try {
  //     const response = await fetch('./cities.json');
  //   } catch (error) {
  //     console.log(error);
  //   }
    
  //     const data = await response.json();
 
  //   console.log("Nigga this coding sucks");
  //     const obj = data;
  //     const arr = Object.values(obj);
  //     const cityCodes = [];
  //     for (let i = 0; i < arr[0].length; i++) {
  //       cityCodes.push(arr[0][i].CityCode);
  //     }
  //     const idArray = [];

  //     for (let i = 0; i < cityCodes.length; i++) {
  //        const id = cityCodes[i] + ",";
  //        idArray.push(id);
  //     }

  //     setIdArray(idArray);
  //     setIsLoading(false);

  
  // }

  // useEffect(() => {
  //   fetchWeatherData();
  // }, []);

  // return (
  //   <div className="Fetchweather">
  //     {isLoading ? <div>Loading...</div> : 
  //       idArray.map((id, index) => (
  //         <div key={index}>{id}</div>
  //       ))
  //     }
  //   </div>
  // );




  // console.log(city);


//   return (
//     <ul>
//       {cities.map(city => (
//         <li key={city.id}>{city.name}</li>
//       ))}
//     </ul>
//   );

// }


// async function fetchData() {
//   try {
//     const baseURL = "cities.json";
//     const response = await axios.get(baseURL);
//     const data = response.data;
//     console.log(data);

//     const obj = data;
//     const arr = Object.values(obj);
//     let city = arr[0][0];
//     const CityCodes = [];
//     for (let i = 0; i < arr[0].length; i++) {
//       CityCodes.push(arr[0][i].CityCode);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// function MyComponent() {
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     fetchData().then((data) => {
//       setPost(data);
//     });
//   }, []);

//   console.log(CityCodes);


//   if (!post) return null;

//   // return <div>{/* render your component */}</div>;
// }