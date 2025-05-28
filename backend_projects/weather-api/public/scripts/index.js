// this is our frontend JS, this is what makes our initial call
// the flow is this index.js (frontend) -> server.js (express) -> fetchweather.js (express route)
// the frontend call goes to /api/weather/${city}
// the express call goes to /api/weather, fetchweather route
// our fetchweather route makes our fetch call to visual crossing
// in simpler terms... 
// Frontend (this) makes a GET request to the backend (fetch api/weather)
// Backend (server) delegates handling of this request to fetchweather router
// Router (fetchweather) processes the request and returns the info to the frontend

// our fetch request to our backend which will then request to our api
async function getWeather() {
    const city = document.getElementById('cityInput').value; // get our city input name
    if(!city) {
        alert('Please Enter Valid City Name');
        return;
    }
    
    try {
        const res = await fetch(`/api/weather/${city}`);
        // check if our response is ok/valid
        if(!res.ok) {
            const err = await res.json();
            alert(`Error: ${err.error}`);
            return;
        }
        // wait for the response
        const weatherInfo = await res.json();
        // display it
        displayWeatherInfo(weatherInfo);
    } catch (error) {
        alert(`Error fetching weather: ${error}`);
    }
}

// our function to display the information on the frontend
function displayWeatherInfo(info) {
    const outputDiv = document.getElementById('weatherOutput');
    outputDiv.innerHTML = `
    <p>Temperature in ${info.resolvedAddress} is ${info.currentConditions.temp} degrees Fahrenheit</p>
    `;
}

// attach to our button
const weatherButt = document.getElementById('weatherButt');
weatherButt.addEventListener('click', getWeather);