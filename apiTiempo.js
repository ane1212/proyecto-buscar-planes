function getWeatherDescription(code){
  let response;
  if(code === 0){
    response =  "Soleado ☀️";
  } 
  if(code === 1 || code === 2) {
    response = "Parcialmente nublado ⛅";
  }
  if(code === 3){
    response ="Nublado ☁️";
  }
  if(code >= 45 && code <= 48) {
    response = "Niebla 🌫";
  }
  if(code >= 51 && code <= 67){ 
    response = "Lluvia ligera 🌦";
  }
  if(code >= 80 && code <= 82){ 
    response = "Lluvia 🌧";
  }
  if(code >= 95){
    response = "Tormenta ⛈";
  }
  else if(response==null){
    response = "Clima desconocido";
  }
  return response;
}

export default async function loadWeatherByCoordinates(LAT,LON) {

  console.log("Módulo de clima cargado");

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`;

  try {
    const response = await fetch(url);
    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    } 

    const data = await response.json();
    const weather = data.current_weather;
    const description = getWeatherDescription(weather.weathercode);
    console.dir(data.current_weather);

    document.getElementById("weather-info").innerHTML = `
    <p>Temperatura: ${weather.temperature} °C</p>
    <p>Viento: ${weather.windspeed} m/s</p>
    <p>Estado: ${description}</p>    
    `;

  } catch (error) {
    console.error("Error al obtener el clima:", error);
    document.getElementById("weather-info").innerHTML = "<p>Error al cargar el clima. Inténtalo de nuevo.</p>";
  }
}