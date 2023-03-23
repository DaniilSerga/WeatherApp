import React from "react";
import classes from './HourlyWeather.module.css';

const HourlyWeather = ({data}) => {
    data.hourly = data.hourly.slice(0, 10);
    
    return (
        <>
            <div className={classes.hourlyContainer}>
                <div className={classes.sectionHeader}>
                    <p className={classes.weatherSummary}>
                        Cloudy conditions from 1AM-9AM, with
                        showers expected at 9AM.
                    </p>
                    <hr className={classes.separator}></hr>
                </div>
                <div className={classes.sectionBody}>
                        {data.hourly.map(weather => {
                            const currentHours = new Date().getHours();
                            const weatherHours = new Date(weather.dt * 1000).getHours();
                            if (currentHours === weatherHours) {
                                weather.dtHours = 'Now';
                            } else {
                                weather.dtHours = new Date(weather.dt * 1000).toLocaleTimeString('en-us', {hour: '2-digit'}).replace(' ', '');
                            }

                            return (
                                <div className={classes.weather}>
                                    <p className={classes.weatherTime}>
                                        {
                                            weather.dtHours
                                        }
                                    </p>
                                    <img className={classes.weatherIcon} src={weather.weather[0].icon} alt='weather'></img>
                                    <p className={classes.temperature}>{Math.round(weather.temp)}</p>
                                </div>
                            )})
                        }
                </div>
            </div>
        </>
    );
}

export default HourlyWeather;