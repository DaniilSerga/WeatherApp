import React from "react";
import classes from './Forecast.module.css';

const Forecast = ({weather}) => {
    if (!weather) {
        return(
            <h3>Loading...</h3>
        )
    }

    return(
        <>
            <li className={classes.forecast}>
                <p>
                    max:{Math.round(weather.maxTemp)}
                    min:{Math.round(weather.minTemp)} 
                    precipitation:{weather.precipitation} 
                    time:{weather.time.toLocaleDateString()} 
                    code:{weather.weatherCode}
                </p>
            </li>
        </>
    );
}

export default Forecast;