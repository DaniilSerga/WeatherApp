import React, { useState, useEffect } from "react";
import Forecast from './Forecast';
import classes from './ForecastList.module.css';

const ForecastList = ({data}) => {
    
    return(
        <div className={classes.forecastListSection}>
            <h3>10-day forecast</h3>
            <ul>
                {
                !data 
                    ? <h2>Loading...</h2> 
                    : data.daily.apparent_temperature_max.map((weather) => <li>{weather}</li>)
                }
            </ul>
        </div>
    );
}

export default ForecastList;