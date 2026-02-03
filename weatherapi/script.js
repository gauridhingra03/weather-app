const apiKey = "a8dfbbf78b6140eb8ed113933260302"; 


const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const conditionEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const errorEl = document.getElementById("error");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    errorEl.textContent = "Please enter a city name";
    return;
  }
  getWeather(city);
});

function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(data => {
      cityEl.textContent = data.location.name;
      tempEl.textContent = `${data.current.temp_c}°C`;
      conditionEl.textContent = data.current.condition.text;
      humidityEl.textContent = `Humidity: ${data.current.humidity}%`;
      windEl.textContent = `Wind: ${data.current.wind_kph} km/h`;

      setBackground(data.current.condition.text);
      errorEl.textContent = "";
    })
    .catch(err => {
      errorEl.textContent = err.message;
    });
}

function setBackground(condition) {
  const text = condition.toLowerCase();

  let image = "images/sunny.jpg";

  if (text.includes("sun") || text.includes("clear")) {
    image = "images/sunny.jpg";
  } else if (text.includes("cloud")) {
    image = "images/cloudy.jpg";
  } else if (text.includes("rain") || text.includes("drizzle")) {
    image = "images/rainyy.jpg";
  } else if (text.includes("thunder")) {
    image = "images/thunder.jpg";
  } else if (text.includes("snow")) {
    image = "images/snow.jpg";
  } else if (text.includes("fog") || text.includes("mist")) {
    image = "images/foggy.jpg";
  }

  document.body.style.backgroundImage = `url('${image}')`;
}

