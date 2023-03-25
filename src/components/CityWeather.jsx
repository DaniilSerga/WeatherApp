import React from "react";
import classes from './CityWeather.module.css';
import backgrounds from '../constants/video-backgrounds';

const CityWeather = ({ isCurrentLocation = false, city }) => {
    return (
        <>
            <div className={classes.cityWeatherContainer}>
                <div className={classes.cityInfoSection}>
                    {isCurrentLocation ?
                        <>
                            <h3 className={classes.locationHeader}>My location</h3>
                            <h4 className={classes.locationSubHeader}>{city}</h4>
                        </> :
                        <>
                            <h3 className={classes.locationHeader}>{city}</h3>
                            <h4 className={classes.locationSubHeader}>12:28</h4>
                        </>
                    }

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
        </>
    )
}

export default CityWeather;