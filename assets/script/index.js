'use strict';

import { onEvent, select } from "./utility.js";

const searchbox = select(".search input");
const searchbutton = select(".search button");
const weatherIcon = select(".weather-icon");
const body = select("body");
const weatherDisplay = select(".weather");
const cityName = select(".city");
const temp = select(".temp");
const humidity = select(".humidity");
const wind = select(".wind");
const feelsLike = select(".feels-like");
const apiKey = "923d269ed60f87c51142600298e463c0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function changeweatherpic(data) {
    console.log(data.weather[0].main);
    let Weathercondition = data.weather[0].main;
    switch(Weathercondition) {
        case 'Clouds':
            weatherIcon.src = "./assets/pictures/full-clouds.png";
            break;
        case 'Clear':
            weatherIcon.src = "./assets/pictures/clear.png";
            body.style.backgroundImage = 'url("./assets/pictures/Clear-sky.gif")';
            break;
        case 'Rain':
            weatherIcon.src = "./assets/pictures/heavy-rain.png";
            break;
        case 'Drizzle':
            weatherIcon.src = "./assets/pictures/drizzle.png";
            break;
        case 'Mist':
            weatherIcon.src = "./assets/pictures/fog.png"
            break;
        case 'Snow':
            weatherIcon.src = "./assets/pictures/snowy.png";
            body.style.backgroundImage = 'url("./assets/pictures/Winter-Wonderland.gif")';
            break;
        case 'Thunderstorm':
            weatherIcon.src = "./assets/pictures/storm.png";
            break;
    }
}

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data);
        weatherDisplay.style.display = "block";
        
        if (response.ok) {
            cityName.innerHTML = data.name;
            temp.innerHTML = `${Math.round(data.main.temp)}°C`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${data.wind.speed}km/h`;
            feelsLike.innerHTML = `${Math.round(data.main.feels_like)}°C`;
            changeweatherpic(data);
        } else {
            cityName.innerHTML = "City not found";
            temp.innerHTML = "";
            humidity.innerHTML = "";
            wind.innerHTML = "";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

onEvent("click", searchbutton, async () => {
    if (searchbox.value.trim() !== "") {
        await checkWeather(searchbox.value);
    }
});

onEvent("load", window, () => searchbox.value = "");