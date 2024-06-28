const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-button');

searchbox.addEventListener('keypress', setQuery);
searchButton.addEventListener('click', () => getResults(searchbox.value)); // Added event listener for button click

function setQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(displayResults)
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `<span class="number">${Math.round(weather.main.temp)}</span><span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `<span class="number">${Math.round(weather.main.temp_min)}</span>°c / <span class="number">${Math.round(weather.main.temp_max)}</span>°c`;

  updateBackgroundImage(weather);
}

function updateBackgroundImage(weather) {
  let body = document.querySelector('body');
  let tempCelsius = weather.main.temp;
  let weatherDescription = weather.weather[0].main.toLowerCase();

  if (weatherDescription.includes('rain')) {
    body.style.backgroundImage = "url('rain.jpg')";
  } else if (weatherDescription.includes('clouds')) {
    body.style.backgroundImage = "url('cloudy.jpg')";
  } else if (weatherDescription.includes('snow')) {
    body.style.backgroundImage = "url('winter.jpg')";
  } else if (weatherDescription.includes('clear')) {
    body.style.backgroundImage = tempCelsius >= 25 ? "url('summer.jpg')" : "url('summer.jpg')";
  } else if (weatherDescription.includes('thunderstorm')) {
    body.style.backgroundImage = "url('thunderstorm.jpg')";
  } else if (weatherDescription.includes('mist') || weatherDescription.includes('fog')) {
    body.style.backgroundImage = "url('mist.jpg')";
  } else {
    body.style.backgroundImage = "url('drizzle.jpg')"; // Default background if none of the conditions match
  }
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();

  return `${day} <span class="number">${date}</span> ${months[month]} <span class="number">${year}</span>`;
}
