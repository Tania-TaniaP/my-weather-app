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

//Week 5 - with Matt - to have a city on the start page
search("Paris");
