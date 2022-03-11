let search = document.getElementById('search');
let background = document.querySelector('.cityImage');
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var date = new Date();
let month = months[date.getMonth()];
var dayName = days[date.getDay()];
let dateOfToday = date.getDate();
// console.log(date.getDate());
let cityObject;
let bgUrl;


async function changeWallImage(city = "cairo"){
  let response = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=_GrMQBmXG_o5ej2PGOnKsyZ_ZMuvUGbo_0tDMK0Kz8c`);
  let backgroundImage = await response.json();
  bgUrl= backgroundImage.results[0].urls.regular;
  background.style.backgroundImage = `url(${bgUrl})`
  console.log(background.style.backgroundImage );
}


// Api weather
async function cityWeather(city = "cairo") {
  let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3ecfe28f69664d0c8ed124926221701&q=${city}&days=4&aqi=yes&alerts=no`);
  cityObject = await response.json();
  console.log(cityObject.forecast.forecastday[2].day.condition.icon);
  displayTodayPart();
}
cityWeather()
searchCity()
changeWallImage()

function displayTodayPart() {
  let temp =
    `<div class="col-md-6 col-sm-12 text-white forecast" style="background-color: var(--mainColor);">
    <div class="itemWeather">
      <div class="itemHeader1 p-2 d-flex align-items-center justify-content-between">
        <p>${days[(date.getDay())%7]}</p>
        <p>${dateOfToday} ${month}</p>
      </div>
      <div class="city">
       <h3>${cityObject.location.country}, ${cityObject.location.name} </h3>
      </div>
      
      <div class="itemContent1 d-flex justify-content-evenly align-items-center">
        <span>${cityObject.current.temp_c} <sup>o</sup>C</span>
        <img src="${cityObject.forecast.forecastday[0].day.condition.icon}"  alt="condition">
      </div>

      <div class="text-center">
        <span class="d-block fw-bold">Max-temp: ${cityObject.forecast.forecastday[0].day.maxtemp_c} <sup>o</sup>C</span>
        <p class="d-block">Min-temp: ${cityObject.forecast.forecastday[0].day.mintemp_c} <sup>o</sup>C</p>
      </div>

      <div class="itemFooter pb-3 text-center row">
       <p class="ps-4 fw-bold fs-4 text-start" style="color: var(--textColor);">${cityObject.current.condition.text}</p>
        <div class="col-md-4">
         <i class="fas fa-tint"></i>
         <span>Humidity: ${cityObject.current.humidity}%</span>
        </div>
        <div class="col-md-4">
         <i class="fas fa-wind"></i>
         <span>Wind: ${cityObject.current.vis_km} Km/h</span>
        </div>
        <div class="col-md-4">
         <i class="far fa-compass"></i>
         <span>Location: ${cityObject.location.tz_id}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-3 col-sm-12 text-white forecast text-center" style="background-color: #373b50;">
   <div class="itemWeather">
     <div class="itemHeader2 p-2  text-center">
       <p>${dateOfToday + 1} ${days[(date.getDay() + 1)%7]}</p>
     </div>
     <img src="${cityObject.forecast.forecastday[1].day.condition.icon}" class="my-2" alt="condition">
     <div class="itemContent2 text-center">
     <div class="text-center">
     <span class="d-block fw-bold"> ${cityObject.forecast.forecastday[1].day.maxtemp_c} <sup>o</sup>C</span>
     <p class="d-block"> ${cityObject.forecast.forecastday[1].day.mintemp_c} <sup>o</sup>C</p>
    </div>
       <p class="mt-5 fw-bold" style="color: var(--textColor);">${cityObject.forecast.forecastday[1].day.condition.text}</p>
     </div>
   </div>
 </div>

 <div class="col-md-3 col-sm-12 text-white forecast text-center" style="background-color: var(--mainColor);">
   <div class="itemWeather">
     <div class="itemHeader3 p-2  text-center">
       <p>${dateOfToday + 2} ${days[(date.getDay() + 2)%7]}</p>
     </div>
     <img src="${cityObject.forecast.forecastday[2].day.condition.icon}" class="my-2" alt="condition">
     <div class="itemContent2 text-center">
     <div class="text-center">
     <span class="d-block fw-bold"> ${cityObject.forecast.forecastday[2].day.maxtemp_c}  <sup>o</sup>C</span>
     <p class="d-block"> ${cityObject.forecast.forecastday[2].day.mintemp_c} <sup>o</sup>C</p>
   </div>
       <p class="mt-5 fw-bold" style="color: var(--textColor);">${cityObject.forecast.forecastday[2].day.condition.text}</p>
     </div>
   </div>
 </div>`
  document.getElementById('displayData').innerHTML = temp;
}

function searchCity() {
  search.addEventListener('keyup', function () {
    cityWeather(search.value.toLowerCase())
    changeWallImage(search.value.toLowerCase())
  })
}

