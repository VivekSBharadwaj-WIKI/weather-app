async function getWeather(city) {
  try {
    document.getElementById("today-temp").innerText = "Loading...";

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found");
      return;
    }
    let lat = geoData.results[0].latitude;
    let lon = geoData.results[0].longitude;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,uv_index,weathercode&hourly=temperature_2m,precipitation_probability,weathercode&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weathercode`;
    console.log(weatherUrl);
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    document.getElementById("cityname").innerText =
      `${geoData.results[0].name}, ${geoData.results[0].country}`;
    document.getElementById("today-temp").innerText =
      `${weatherData.current.temperature_2m} ${weatherData.current_units.temperature_2m}`;

    let code = weatherData.current.weathercode;
    let icon = symbolDecider(code);
    document.getElementById("weather-symbol").innerHTML = icon;

    document.getElementById("feel-temp").innerText =
      `${weatherData.current.apparent_temperature} ${weatherData.current_units.apparent_temperature}`;
    document.getElementById("windspeed").innerText =
      `${weatherData.current.wind_speed_10m} ${weatherData.current_units.wind_speed_10m}`;
    document.getElementById("rain-chance").innerText =
      `${weatherData.hourly.precipitation_probability[0]} %`;
    document.getElementById("uv-index").innerText =
      `${weatherData.current.uv_index} ${weatherData.current_units.uv_index}`;

    renderHourlyCards(weatherData);
    renderDailyCards(weatherData);
  } catch (err) {
    console.error(err);
    alert("Failed to fetch weather");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const savedCity = localStorage.getItem("city") || "Bangalore";
  document.getElementById("searchcity").value = savedCity;
  getWeather(savedCity);
});

document.getElementById("searchcity").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = e.target.value.trim();
    if (city) {
      localStorage.setItem("city", city);
      getWeather(city);
    }
  }
});

function symbolDecider(code) {
  if (code === 0) return `<i class="fa-solid fa-sun"></i>`;
  if (code <= 3) return `<i class="fa-solid fa-cloud-sun"></i>`;
  if (code >= 45 && code <= 48) return `<i class="fa-solid fa-smog"></i>`;
  if (code >= 51 && code <= 65) return `<i class="fa-solid fa-cloud-rain"></i>`;
  if (code >= 71 && code <= 75) return `<i class="fa-solid fa-snowflake"></i>`;
  if (code >= 95) return `<i class="fa-solid fa-bolt"></i>`;
  return `<i class="fa-solid fa-cloud"></i>`;
}

function renderHourlyCards(weatherData, count = 6) {
  const container = document.getElementById("forecast-card-hourly");
  container.innerHTML = "";

  for (let i = 0; i < Math.min(count, weatherData.hourly.time.length); i++) {
    let time = new Date(weatherData.hourly.time[i]).toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    });

    let temp = weatherData.hourly.temperature_2m[i];

    let code = weatherData.hourly.weathercode[i];
    let icon = symbolDecider(code);

    const card = document.createElement("div");
    card.className = "weather-card";

    card.innerHTML = `
      <div class="time">${time}</div>
      <div class="icon">${icon}</div>
      <div class="temp">${temp}°</div>
    `;

    container.appendChild(card);
  }
}

function renderDailyCards(weatherData, count = 6) {
  const container = document.getElementById("daily-forecast-container");
  container.innerHTML = "";

  for (let i = 0; i < Math.min(count, weatherData.daily.time.length); i++) {
    let time = new Date(weatherData.daily.time[i]).toLocaleDateString([], {
      weekday: "long",
    });

    let temp_max = weatherData.daily.temperature_2m_max[i];
    let temp_min = weatherData.daily.temperature_2m_min[i];

    let code = weatherData.daily.weathercode[i];
    let icon = symbolDecider(code);
    let desc = getWeatherText(code);

    const card = document.createElement("div");
    card.className = "daily-weather-card";

    card.innerHTML = `
      <div class="day">${time}</div>
      <div class="icon">${icon} ${desc}</div>
      <div class="temp_max">${temp_max}°</div>
      <div class="temp_min">${temp_min}°</div>
    `;

    container.appendChild(card);
  }
}

function getWeatherText(code) {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly Cloudy";
  if (code >= 45 && code <= 48) return "Fog";
  if (code >= 51 && code <= 65) return "Rain";
  if (code >= 71 && code <= 75) return "Snow";
  if (code >= 95) return "Storm";
  return "Cloudy";
}
