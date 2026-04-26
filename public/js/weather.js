const apiKey = "6e1756d8c08c77bfb77a5fb7baaf3b56";

// Search Weather
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");

  if (!city) {
    alert("Enter city name");
    return;
  }

  // Spinner
  result.innerHTML = `
    <div class="spinner-border text-light"></div>
  `;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();
    displayWeather(data); // 

  } catch (err) {
    console.log(err);
    result.innerHTML = `<p class="text-danger">Error fetching data</p>`;
  }
}

// Auto Location Weather
function getLocationWeather() {
  const result = document.getElementById("weatherResult");

  if (navigator.geolocation) {

    // Spinner
    result.innerHTML = `
      <div class="spinner-border text-light"></div>
    `;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        const data = await res.json();
        displayWeather(data);

      } catch (err) {
        result.innerHTML = `<p class="text-danger">Location fetch error</p>`;
      }
    });
  }
}

// Display Weather (Single UI Controller)
function displayWeather(data) {
  const result = document.getElementById("weatherResult");

  if (data.cod !== 200) {
    result.innerHTML = `<p class="text-danger">City not found</p>`;
    return;
  }

  const weatherMain = data.weather[0].main.toLowerCase();

  // Dynamic Background
  document.body.className = "";
  document.body.classList.add(weatherMain);

 let icon = '<i class="fa-solid fa-sun"></i>';

if (weatherMain.includes("cloud")) {
  icon = '<i class="fa-solid fa-cloud" style="color:#94a3b8"></i>';
}

if (weatherMain.includes("rain")) {
  icon = '<i class="fa-solid fa-cloud-rain" style="color:#38bdf8"></i>';
}

if (weatherMain.includes("snow")) {
  icon = '<i class="fa-solid fa-snowflake" style="color:#e0f2fe"></i>';
}

if (weatherMain.includes("thunder")) {
  icon = '<i class="fa-solid fa-bolt" style="color:#facc15"></i>';
}

result.innerHTML = `
  <h3>${data.name}, ${data.sys.country}</h3>
  <div class="weather-icon">${icon}</div>
  <div class="temp">${data.main.temp}°C</div>
  <p>${data.weather[0].description}</p>
`;

  // Sunrise & Sunset Convert
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  result.innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <div style="font-size:70px;">${icon}</div>
    <div class="temp">${Math.round(data.main.temp)}°C</div>
    <p>${data.weather[0].description}</p>
    <hr>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬 Wind: ${data.wind.speed} m/s</p>
    <p>🌅 Sunrise: ${sunrise}</p>
    <p>🌇 Sunset: ${sunset}</p>
  `;
}

// Enter Key Support
document.getElementById("cityInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

// // 🚀 Auto Load Location

// window.onload = getLocationWeather;


