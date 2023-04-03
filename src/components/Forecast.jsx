import React from "react";
import classes from "./Forecast.module.css";

const Forecast = ({ weather }) => {
  if (!weather) {
    return <h3>Loading...</h3>;
  }

  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
        <li className={classes.forecast}>
          <div className={classes.container}>
            <p className={classes.dayOfWeek}>{DAYS[weather.time.getDay()]}</p>

            {weather.weatherIcon.description.includes("Rainy") ? (
                <div className={classes.iconContainer}>
                    <img
                      className={classes.weatherIcon}
                      src={weather.weatherIcon.icon}
                      alt="weather icon"
                    />
                    <p className={classes.humidityProbability}>
                      {weather.precipitation}%
                    </p>
                </div>
            ) : (
              <div className={classes.iconContainer}>
                
                    <img
                      className={classes.weatherIcon}
                      src={weather.weatherIcon.icon}
                      alt="weather icon"
                    ></img>
              </div>
            )}
          </div>

            <div className={classes.extremeTemp}>
                <p className={classes.minTemp}>{Math.round(weather.minTemp)}</p>
                
                <div className={classes.line}></div>
                
                <p className={classes.maxTemp}>{Math.round(weather.maxTemp)}</p>
            </div>
        </li>
    </>
  );
};

export default Forecast;
