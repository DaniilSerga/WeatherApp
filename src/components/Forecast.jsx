import React from "react";
import classes from './Forecast.module.css';

const Forecast = ({weather}) => {
    if (!weather) {
        return(
            <h3>Loading...</h3>
        )
    }

    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return(
        <>
            <li className={classes.forecast}>
                
                <p className={classes.dayOfWeek}>
                    {DAYS[weather.time.getDay()]} 
                </p>

                { weather.weatherIcon.description.includes('Rainy')  
                  ? <div className={classes.iconContainer}>
                        <img className={classes.weatherIcon} src={weather.weatherIcon.icon} alt='weather icon'/>
                        <p className={classes.humidityProbability}>
                            {weather.precipitation}%
                        </p>
                    </div>
                  : <div className={classes.iconContainer}>
                        <img className={classes.weatherIcon} src={weather.weatherIcon.icon} alt='weather icon'></img>
                    </div>
                }

                <div className={classes.extremeTemp}>
                    <p className={classes.minTemp}>
                        {Math.round(weather.minTemp)} 
                    </p>

                    <hr className={classes.tempIndicator}></hr>
                    
                    <p className={classes.maxTemp}>
                        {Math.round(weather.maxTemp)}
                    </p>
                </div>
            </li>

            <hr className={classes.separatingLine}></hr>
        </>
    );
}

export default Forecast;