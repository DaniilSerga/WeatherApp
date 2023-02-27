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
    return fetch(`https://api.gismeteo.net/v2/weather/forecast/aggregate/?latitude=${coords.lat}&longitude=${coords.lon}&days=3&lang=en`, {
        headers: {
            'X-Gismeteo-Token': '56b30cb255.3443075'
        },
        'mode': 'cors',
    })
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