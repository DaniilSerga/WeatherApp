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
                { weather.weatherIcon.description.includes('Rainy')  
                  ? <div className={classes.iconContainer}>
                        <img className={classes.weatherIcon} src={weather.weatherIcon.icon} alt='weather icon'></img>
                        <p className={classes.humidityProbability}>
                            {weather.precipitation}%
                        </p>
                    </div>
                  : <img className={classes.weatherIcon} src={weather.weatherIcon.icon} alt='weather icon'></img>
                }

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