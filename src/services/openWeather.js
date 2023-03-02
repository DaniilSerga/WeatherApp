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
        }).catch(err => {
            console.log(err);
        });
}

const fetchForecast = async (coords) => {
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + 9);

    startDate = startDate.toLocaleDateString().split('.').reverse().join('-');
    endDate = endDate.toLocaleDateString().split('.').reverse().join('-');
    
    // https://artefacts.ceda.ac.uk/badc_datadocs/surface/code.html

    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=apparent_temperature_max,apparent_temperature_min,precipitation_probability_mean,weathercode&timezone=auto&current_weather=true&start_date=${startDate}&end_date=${endDate}`)
        .then(response => { 
            return response.json(); 
        }).then(response => { 
            return response; 
        }).catch(err => {
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