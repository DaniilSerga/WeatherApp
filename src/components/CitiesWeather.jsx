import React from "react";
import classes from './CitiesWeather.module.css';

const CitiesWeather = () => {
    return(
        <div className={classes.citiesWeather}>
            <button className={classes.searchBar}>
                <p>Search a city or airport</p>
            </button>
        </div>
    );
}

export default CitiesWeather;