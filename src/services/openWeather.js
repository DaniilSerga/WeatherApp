import keys from './secrets';
import iconsService from './iconsService';
import coordsService from './coordsService';
import axios from 'axios';

const service = {
    getCurrentWeather: async () => {
        const coords = await coordsService.getCurrentCoords();
        return await fetchCurrentWeather(coords);
    },
    getCurrentWeatherByCityCoords: async (coords) => {
        return await fetchCurrentWeather(coords);
    },
    getAdditionalCurrentWeather: async (coords) => {
        return await fetchAdditinalCurrentWeather(coords);
    },
    getForecast: async () => {
        const coords = await coordsService.getCurrentCoords();
        return await fetchForecast(coords);
    },
    getForecastByCoords: async (coords) => {
        return await fetchForecast(coords);
    },
    getCitiesNames: async (input) => {
        return await fetchCitiesNames(input);
    },
    updateCitiesWeather: async (input) => {
        let promises = input.map(city => {
            return service.getCurrentWeatherByCityCoords({
                lon: city.coord.lon,
                lat: city.coord.lat
            })
        })

        return Promise.all(promises);
    }
}

const fetchCurrentWeather = async (coords) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${keys.openWeather1}`)
        .then(async response => {
            return getCurrentTime({
                lon: response.data.coord.lon,
                lat: response.data.coord.lat
            }).then(res => {
                response.data.dt = res;
                return response.data;
            });
        }).catch(err => {
            console.error(err);
            return null;
        })
}

const fetchAdditinalCurrentWeather = async (coords) => {
    console.error('GLOBAL MONEY LOST!!!! ALERT');

    return axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=daily,minutely&units=metric&appid=${keys.openWeather2}`)
        .then(response => {
            response.data.hourly.forEach(hourlyWeather => {
                const iconName = hourlyWeather.weather[0].icon;
                const icon = `http://openweathermap.org/img/wn/${iconName}@2x.png`
                hourlyWeather.weather[0].icon = icon;
            })

            return response.data;
        }).catch(err => {
            console.error(err);
            return null;
        })
}

const fetchForecast = async (coords) => {
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + 9);

    startDate = startDate.toLocaleDateString().split('.').reverse().join('-');
    endDate = endDate.toLocaleDateString().split('.').reverse().join('-');

    return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=apparent_temperature_max,apparent_temperature_min,precipitation_probability_mean,weathercode&timezone=auto&current_weather=true&start_date=${startDate}&end_date=${endDate}`)
        .then(response => {
            const weatherCodes = response.data.daily.weathercode;
            response.data.daily.weatherIcons = weatherCodes.map(weatherCode => {
                if (!weatherCode) {
                    return iconsService.getWeatherIcon(1);
                }

                return iconsService.getWeatherIcon(weatherCode);
            });

            return response.data;
        }).catch(err => {
            console.error(err);
            return null;
        })
}

const fetchCitiesNames = async (input) => {
    if (!input) {
        return [];
    }

    return axios.get(`https://api.api-ninjas.com/v1/geocoding?limit=10&city=${input}`, {
        headers: {
            'X-Api-Key': keys.ninjas,
            'Content-Type': 'application/json'
        },
    }).then(res => {
        return res.data;
    }).catch(err => {
        return fetchCitiesNames(input);
    })
}

const getCurrentTime = async (coords) => {
    return axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${keys.ipgeolocation}&lat=${coords.lat}&long=${coords.lon}`)
        .then(res => {
            return res.data.date_time;
        })
}

export default service;