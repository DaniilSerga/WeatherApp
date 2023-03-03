import React from "react";
import classes from './CitiesWeather.module.css';

const CitiesWeather = ({...props}) => {
    return(
        <div className={classes.citiesWeather}>
            <button className={classes.searchBar} onClick={props.setModalActive(true)}>
                <p>Search a city or airport</p>
            </button>
        </div>
    );
}

export default CitiesWeather;