import React from "react";
import classes from './CityWeather.module.css';
import backgrounds from '../constants/video-backgrounds';
import Background from "./Background";

const CityWeather = ({ isCurrentLocation, city }) => {
    return (
        <div className={classes.cityWeather}>
            <Background isCityBackground={true} data={city}/>
            <div className={classes.cityWeatherContainer}>
                <div className={classes.cityInfoSection}>
                    <h3 className={classes.locationHeader}>{isCurrentLocation ? 'My location' : city.name}</h3>
                    <h4 className={classes.locationSubHeader}>{isCurrentLocation ? city.name : '12:28'}</h4>

                    <p className={classes.weatherOverview}>Partly cloudy</p>
                </div>

                <div className={classes.weatherInfoSection}>
                    <p className={classes.temperature}>21</p>
                    <div className={classes.extremeTemps}>
                        <p>H:29</p>
                        <p>L:21</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CityWeather;