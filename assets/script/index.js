'use strict';

import { onEvent, select } from "./utility.js";

const searchbox = select(".search input");
const searchbutton = select(".search button");
const cityName = select(".city");
const temp = select(".temp");
const humidity = select(".humidity");
const wind = select(".wind");
const apiKey = "923d269ed60f87c51142600298e463c0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        if (response.ok) {
            cityName.innerHTML = data.name;
            temp.innerHTML = `${Math.round(data.main.temp)}°C`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${data.wind.speed}km/h`;
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
