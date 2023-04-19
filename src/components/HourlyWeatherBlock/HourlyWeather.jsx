import React from "react";
import classes from './HourlyWeather.module.css';
import HourWeather from "./HourWeather";

const HourlyWeather = ({data}) => {
    const formatTime = (weather) => {
        const currentHours = new Date().getHours();
        const weatherHours = new Date(weather.dt * 1000).getHours();

        if (currentHours === weatherHours) {
            weather.dtHours = 'Now';
        } else {
            weather.dtHours = new Date(weather.dt * 1000).toLocaleTimeString('en-us', {hour: '2-digit'}).replace(' ', '');
        }

        return weather;
    }

    return (
        <div className={classes.hourlyContainer}>
            <div className={classes.sectionHeader}>
                <p className={classes.weatherSummary}>
                    Cloudy conditions from 1AM-9AM, with
                    showers expected at 9AM.
                </p>
            </div>
            <div className={classes.sectionBody}>
                    {data.map((weather, index) => {
                        const formattedWeather = formatTime(weather);
                        
                        return (
                            <HourWeather weather={formattedWeather} key={index}/>
                        )})
                    }
            </div>
        </div>
    );
}

export default HourlyWeather;