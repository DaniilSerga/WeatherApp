import React from "react";
import Forecast from './Forecast';
import classes from './ForecastList.module.css';

const ForecastList = ({data}) => {
    if (!data) {
        return (
            <div className={classes.forecastListSection}>
                <h3>Loading...</h3>
            </div>
        )
    }

    let forecasts = [];
    for (let i = 0; i < data.daily.apparent_temperature_max.length; i++) {
        forecasts.push({
            maxTemp: data.daily.apparent_temperature_max[i],
            minTemp: data.daily.apparent_temperature_min[i],
            precipitation: data.daily.precipitation_probability_mean[i],
            time: new Date(data.daily.time[i]),
            weatherCode: data.daily.weathercode[i],
        });
    }

    return(
        <div className={classes.forecastListSection}>
            <h3>10-day forecast</h3>
            <ul>
                {
                    forecasts.map((weather) => <Forecast weather={weather}/>)
                }
            </ul>
        </div>
    );
}

export default ForecastList;