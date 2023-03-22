import keys from './secrets';

const service = {
    getCurrentWeather: async () => {
        const coords = await getCoords();
        return await fetchCurrentWeather(coords);
    },
    getCurrentWeatherByCityName: async (cityName) => {

    },
    getAdditionalCurrentWeather: async () => {
        const coords = await getCoords();
        return await fetchAdditinalCurrentWeather(coords);
    },
    getForecast: async() => {
        const coords = await getCoords();
        return await fetchForecast(coords);
    },
    getForecastByCityName: async(cityName) => {

    },
    getCitiesNames: async(input) => {
        if (!input) {
            return [];
        }

        return await fetchCitiesNames(input);
    }
}

const fetchCurrentWeather = async (coords) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${keys.openWeather1}`)
        .then(response => {
            return response.json();
        }).then(data => {
            return data;
        }).catch(err => {
            console.log(err);
        });
}

const fetchAdditinalCurrentWeather = async (coords) => {
    return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=daily,minutely&units=metric&appid=${keys.openWeather2}`)
        .then(response => {
            return response.json();
        }).then(response => {
            console.log(response);

            let data = response.hourly;

            response.hourly.forEach(hourlyWeather => {
                const iconName = hourlyWeather.weather[0].icon;
                const icon = `http://openweathermap.org/img/wn/${iconName}@2x.png`
                hourlyWeather.weather[0].icon = icon;
            })

            return response;
        }).catch(err => {
            console.error(err);
        })
}

const fetchForecast = async (coords) => {
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + 9);

    startDate = startDate.toLocaleDateString().split('.').reverse().join('-');
    endDate = endDate.toLocaleDateString().split('.').reverse().join('-');
    
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=apparent_temperature_max,apparent_temperature_min,precipitation_probability_mean,weathercode&timezone=auto&current_weather=true&start_date=${startDate}&end_date=${endDate}`)
        .then(response => { 
            return response.json(); 
        }).then(response => { 
            const weatherCodes = response.daily.weathercode;
            response.daily.weatherIcons = weatherCodes.map(weatherCode => {
                if (!weatherCode) {
                    return getWeatherIcon(1);
                }
                
                return getWeatherIcon(weatherCode);
            });

            console.log('FORECAST');
            console.log(response);
            return response; 
        }).catch(err => {
            console.error(err);
        });
}

const fetchCitiesNames = async (input) => {
    if (!input) {
        return [];
    }

    return fetch(`https://api.api-ninjas.com/v1/city?limit=10&name=${input}`, {
            method: 'GET',
            headers: { 'X-Api-Key': keys.ninjas},
            contentType: 'application/json',
        }).then(response => {
            if (response.status === 400) {
                throw new Error(`Failder to fetch. Provided prop: '${input}'`)
            }

            return response.json();
        }).then(response => {
            return response;
        }).catch(err => {
            console.error(err);
            return err;
        });
}

const getCoords = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve({
                lon: position.coords.longitude,
                lat: position.coords.latitude,
            });
        }, reject);
    });
}

const getWeatherIcon = (wmoCode) => {
    switch (wmoCode) {
        case 0:
        case 1:
            return {
                description: 'Sunny',
                icon: "http://openweathermap.org/img/wn/01d@2x.png",
            };

        case 2:
            return {
                description: 'Partly cloudy',
                icon: "http://openweathermap.org/img/wn/02d@2x.png",
            };

        case 3:
            return {
                description: 'Cloudy',
                icon: "http://openweathermap.org/img/wn/03d@2x.png",
            };

        // Foggy
        case 45:
        case 48:
            return {
                description: 'Foggy',
                icon: "http://openweathermap.org/img/wn/50d@2x.png",
            };
            
        // Light drizzle
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 80:
        case 81:    // heavy showers
        case 82:    // heavy showers
            return {
                description: 'Rainy',
                icon: "http://openweathermap.org/img/wn/09d@2x.png"
            };

        // Light rain
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            return {
                description: 'Rainy',
                icon: "http://openweathermap.org/img/wn/10d@2x.png",
            };

        // Snow
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return {
                description: 'Rainy',
                icon: "http://openweathermap.org/img/wn/13d@2x.png",
            };

        // Thunderstorms
        case 95:
        case 96:
        case 99:
            return {
                description: 'Rainy',
                icon: "http://openweathermap.org/img/wn/11d@2x.png"
            };
        
        default:
            return null;
    }
}

const getIconWithCode = (openWeatherCode) => {

}

export default service;