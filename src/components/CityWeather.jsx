import React, { useState, useEffect } from "react";
import classes from './CityWeather.module.css';
import Background from "./Background";

const CityWeather = ({ isCurrentLocation, city }) => {
    const [cityTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        let timer = setInterval(() => setCurrentTime(new Date(city.dt)), 1000);

        return () => {
            clearInterval(timer);
        }
    })

    console.log(city);

    return (
        <div className={classes.cityWeather}>
            <Background isCityBackground={true} data={city}/>
            <div className={classes.cityWeatherContainer}>
                <div className={classes.cityInfoSection}>
                    <h3 className={classes.locationHeader}>{isCurrentLocation ? 'My location' : city.name}</h3>
                    <h4 className={classes.locationSubHeader}>{isCurrentLocation ? city.name : cityTime.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})}</h4>

                    <p className={classes.weatherOverview}>{city.weather[0].main}</p>
                </div>

                <div className={classes.weatherInfoSection}>
                    <p className={classes.temperature}>{Math.round(city.main.temp)}</p>
                    <div className={classes.extremeTemps}>
                        <p>H:{Math.round(city.main.temp_max)}</p>
                        <p>L:{Math.round(city.main.temp_min)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CityWeather;