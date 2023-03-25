import React from "react";
import classes from './CitiesWeather.module.css';
import loupe from '../assets/icons/loupe.png'
import CityWeather from "./CityWeather";

const CitiesWeather = ({setModalActive}) => {
    const showModal = () => {
        setModalActive(true);
    }

    return(
        <div className={classes.citiesWeather}>
            <div className={classes.searchSection}>
                <button className={classes.searchBar} onClick={showModal}>
                    <img src={loupe} alt="Search cities weather"/>
                    <p>Search a city or airport</p>
                </button>
            </div>
            <div className={classes.citiesSection}>
                <CityWeather isCurrentLocation={true} city="Minsk"/>
                <CityWeather city="Paris"/>
            </div>
        </div>
    );
}

export default CitiesWeather;