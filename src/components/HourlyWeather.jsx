import React from "react";
import classes from './HourlyWeather.module.css';

const HourlyWeather = ({data}) => {
    return (
        <>
            <div className={classes.hourlyContainer}>
                <p>
                    Cloudy conditions from 1AM-9AM, with
                    showers expected at 9AM.
                </p>
            </div>
        </>
    );
}

export default HourlyWeather;