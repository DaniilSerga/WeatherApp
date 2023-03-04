import React from "react";
import classes from './CitiesWeather.module.css';

const CitiesWeather = ({setModalActive}) => {
    const showModal = () => {
        setModalActive(true);
    }

    return(
        <div className={classes.citiesWeather}>
            <button className={classes.searchBar} onClick={() => showModal()}>
                <p>Search a city or airport</p>
            </button>
        </div>
    );
}

export default CitiesWeather;