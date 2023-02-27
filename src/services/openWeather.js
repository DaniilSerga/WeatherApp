const service = {
    getCurrentWeather: async () => {
        const coords = await getCoords();
        return await fetchCurrentWeather(coords);
    },
    getForecast: async() => {
        const coords = await getCoords();
        return await fetchForecast(coords);
    }
}

const fetchCurrentWeather = async (coords) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=80a54215314d69a082d889832eda2351`)
        .then(response => {
            return response.json();
        }).then(data => {
            return data;
        });
}

const fetchForecast = async (coords) => {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max&timezone=GMT&current_weather=true&start_date=2023-02-27&end_date=2023-03-04&timeformat=unixtime`)
        .then(response => { 
            console.log(response);
            return response.json(); 
        }).then(response => { 
            console.log(response);
            return response; 
        })
        .catch(err => {
            console.error(err);
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

export default service;