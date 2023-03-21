import React from "react";
import classes from './CitiesWeather.module.css';
import loupe from '../assets/icons/loupe.png'

const CitiesWeather = ({setModalActive}) => {
    const showModal = () => {
        setModalActive(true);
    }

    return(
        <div className={classes.citiesWeather}>
            <button className={classes.searchBar} onClick={showModal}>
                <img src={loupe} alt="Search cities weather"/>
                <p>Search a city or airport</p>
            </button>
        </div>
    );
}

export default CitiesWeather;