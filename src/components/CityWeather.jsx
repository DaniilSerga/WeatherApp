import React, { useState, useEffect } from "react";
import classes from './CityWeather.module.css';
import Background from "./Background";

const CityWeather = ({ isCurrentLocation, city, currentCity, setCurrentCity }) => {
    const [chosenCity, setChosenCity] = useState(city);

    const [cityTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        let timer = setInterval(() => setCurrentTime(new Date(city.dt)), 1000);

        return () => {
            clearInterval(timer);
        }
    })

    const changeCurrentCity = () => {
        if (isCurrentLocation) {
            return;
        }

        const chosen = chosenCity;
        setChosenCity(currentCity);
        console.log('CHOSEN');
        console.log(chosenCity);
        setCurrentCity({isLoading: false, value: chosen});
        console.log('CURRENT');
        console.log(currentCity);
    }

    return (
        <div className={isCurrentLocation ? classes.currentCityWeather : classes.cityWeather} onClick={() => changeCurrentCity()}>
            <Background isCityBackground={true} data={chosenCity}/>
            <div className={classes.cityWeatherContainer}>
                <div className={classes.cityInfoSection}>
                    <h3 className={classes.locationHeader}>{isCurrentLocation ? 'My location' : chosenCity.name}</h3>
                    <h4 className={classes.locationSubHeader}>{isCurrentLocation ? chosenCity.name : cityTime.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})}</h4>

                    <p className={classes.weatherOverview}>{chosenCity.weather[0].main}</p>
                </div>

                <div className={classes.weatherInfoSection}>
                    <p className={classes.temperature}>{Math.round(chosenCity.main.temp)}</p>
                    <div className={classes.extremeTemps}>
                        <p>H:{Math.round(chosenCity.main.temp_max)}</p>
                        <p>L:{Math.round(chosenCity.main.temp_min)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CityWeather;