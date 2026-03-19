function getWeatherDescription(code) {
  if (code == null || code === undefined) {
    return "Sin datos";
  }

  switch (true) {
    case code === 0:
      return "Cielo despejado ☀️";

    case code === 1:
      return "Mayormente despejado 🌤️";

    case code === 2:
      return "Parcialmente nublado ⛅";

    case code === 3:
      return "Nublado ☁️";

    case code >= 45 && code <= 48:
      return "Niebla 🌫️";

    case code >= 51 && code <= 55:
      return "Llovizna 🌦️";

    case code >= 56 && code <= 57:
      return "Llovizna helada ❄️🌦️";

    case code >= 61 && code <= 65:
      return "Lluvia 🌧️";

    case code >= 66 && code <= 67:
      return "Lluvia helada 🌧️❄️";

    case code >= 71 && code <= 75:
      return "Nieve ❄️";

    case code === 77:
      return "Granizo de nieve / Aguanieve fina ❄️";

    case code >= 80 && code <= 82:
      return "Chubascos 🌧️";

    case code >= 85 && code <= 86:
      return "Chubascos de nieve 🌨️";

    case code >= 95 && code <= 99:
      return "Tormenta ⛈️";

    default:
      return `Desconocido (${code})`;
  }
}

export default async function loadWeatherByCoordinates(LAT, LON) {

  console.log("Módulo de clima cargado");

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const weather = data.current_weather;
    const description = getWeatherDescription(weather.weathercode);
    console.dir(data.current_weather);

    document.getElementById("weather-info").innerHTML = `
        <div class="weather-item">
            <span class="label">Temperatura</span>
            <div class="value">${weather.temperature}°C</div>
        </div>
        <div class="weather-item">
            <span class="label">Viento</span>
            <div class="value">${weather.windspeed} m/s</div>
        </div>
        <div class="weather-item">
            <span class="label">Estado</span>
            <div class="value">${description}</div>
        </div>
    `;
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    document.getElementById("weather-info").innerHTML = "<p>Error al cargar el clima. Inténtalo de nuevo.</p>";
  }
}