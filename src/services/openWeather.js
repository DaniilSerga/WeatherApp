const getWeather = async (setWeather) => {
    const coords = await getCoords();

    console.log('\nКООРДИНАТЫ');
    console.log(coords);

    const res = await fetchData(coords);

    console.log('\nFETCH');
    console.log(res);

    setWeather(res);
}

const fetchData = async (coords) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=80a54215314d69a082d889832eda2351`)
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