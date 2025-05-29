// controller for our weather fetch
import axios from "axios";
import { getWeatherRedis } from "../caching/redisCache.js";

// our api key to access the info
const apiKey = process.env.VC_WEATHER_KEY; // our visual crossing key

export const getWeather = async (req, res) => {
    const { city } = req.params; // destructure our city

    // trying to use our redis caching
    try {
        const response = await getWeatherRedis(city);
        res.json(response)
    } catch (error) {
        console.error('error fetching weather data, check spelling or try again later:', error.message);
        res.status(500).json({ error: 'failed to fetch weather data, check spelling or try again later' });
    }

    // // without redis, just fetching from API no cache option
    // try {
    //     // get our response using axios.get, this is like fetch
    //     const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`);
    //     res.json(response.data) // express method to send our json to the frontend
    // } catch (error) {
    //     // error handling
    //     console.error('error fetching weather data, check spelling or try again later:', error.message);
    //     res.status(500).json({ error: 'failed to fetch weather data, check spelling or try again later' });
    // }
};
