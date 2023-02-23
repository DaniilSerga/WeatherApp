const getWeather = async () => {
    const coords = await getCoords();
    return await fetchData(coords);
}

const fetchData = async (coords) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=80a54215314d69a082d889832eda2351`)
        .then(response => {
            return response.json();
        }).then(data => {
            return data;
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

export default getWeather;