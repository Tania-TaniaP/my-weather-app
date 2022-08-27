//Week5
//Week4 Ch1 function
function formatDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let curDate = date.getDate();
  let year = date.getFullYear();

  return `${weekDay} ${hours}:${minutes} </br> ${curDate}-${month}-${year}`;
}

//Week 8 - API call to get forecast
function getForecast(coordinates) {
  //console.log(coordinates);

  let apiKey = "2261a75fec295aecf3834a6eb8281d07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//Week4 Ch 2 function - Week 5 main H/w changing: //API call to the weather app --- show the city --- show the weather
function showWeather(response) {
  //console.log(response);

  let temperature = response.data.main.temp;
  let temp = Math.round(temperature);
  let tempElement = document.querySelector("#now-temperature");
  tempElement.innerHTML = `${temp}`;

  let description = response.data.weather[0].main;
  let descriprionElement = document.querySelector("#description");
  descriprionElement.innerHTML = `${description}`;

  let maxTemperature = response.data.main.temp_max;
  let minTemperature = response.data.main.temp_min;
  let maxTemp = Math.round(maxTemperature);
  let minTemp = Math.round(minTemperature);

  let maxTempElement = document.querySelector("#max-temp");
  maxTempElement.innerHTML = `${maxTemp}`;
  let minTempElement = document.querySelector("#min-temp");
  minTempElement.innerHTML = `${minTemp}`;

  let windSpeed = response.data.wind.speed;
  let windS = Math.round(windSpeed);
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${windS}`;

  let humidity = response.data.main.humidity;
  let humidityUnits = Math.round(humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidityUnits}`;

  let city = response.data.name;
  let cityElement = document.querySelector("#world-city");
  cityElement.innerHTML = `${city}`;

  let country = response.data.sys.country;
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = `${country}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

//Week 5 - with Matt - to have a city on the start page - function
function search(city) {
  let apiKey = "2261a75fec295aecf3834a6eb8281d07";
  //let cityInput = document.querySelector("#city-input")
  //let city = cityInput.value //- we need this to get the value thet uset is giving us
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  //console.log(apiUrl);
  //console.log(axios);
  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

//Week 5 - Bonus - GPS location - function
function getCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `metric`;
  let apiKey = `2261a75fec295aecf3834a6eb8281d07`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

//Week 7 - Unit conversion - functions
function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#now-temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#now-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

// Week4 Date Day and Time - Ch1
let dates = document.querySelector(".daydate");
let currentDayTime = new Date();

dates.innerHTML = formatDate(currentDayTime);

//Week4 Display the city from the Search engine - Ch2
let form = document.querySelector("#cityForm");
form.addEventListener("submit", showCity);

//Week 5 - Bonus - GPS location
let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", getLocation);

//Week 7 - Unit conversion
let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//Week 5 - with Matt - to have a city on the start page
search("Paris");

//Week 8 - function for corect days from API
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//Week 8 - moving forecast part HTML to JS - function
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "<ul>";
  let days = ["Thu", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <li>
  <span class="days"> ${formatDay(forecastDay.dt)} </span>
  ${index}
  <img
  src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
  alt = ""
  width = "42"
  />
  ${Math.round(forecastDay.temp.min)}° C / ${Math.round(
          forecastDay.temp.max
        )}° C
  </li>
  `;
    }
  });

  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}
