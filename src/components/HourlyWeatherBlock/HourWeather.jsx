import React from "react";
import classes from './HourWeather.module.css';

const HourWeather = ({weather}) => {
  return (
    <div className={classes.weather}>
        <p className={classes.weatherTime}>{weather.dtHours}</p>
            <img className={classes.weatherIcon} src={weather.weather[0].icon} alt="weather"></img>
        <p className={classes.temperature}>{Math.round(weather.temp)}</p>
    </div>
  );
};

export default HourWeather;
