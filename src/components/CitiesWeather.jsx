import React from "react";
import classes from './CitiesWeather.module.css';
import loupe from '../assets/icons/loupe.png'
import CityWeather from "./CityWeather";

const CitiesWeather = ({setModalActive, citiesWeather}) => {
    return(
        <div className={classes.citiesWeather}>
            <div className={classes.searchSection}>
                <button className={classes.searchBar} onClick={() => setModalActive(true)}>
                    <img src={loupe} alt="Search cities weather"/>
                    <p>Search a city or airport</p>
                </button>
            </div>
            <div className={classes.citiesSection}>
                <CityWeather isCurrentLocation={true} city="Minsk"/>

                { citiesWeather && citiesWeather.length > 1 && citiesWeather.map(city => {
                    return <CityWeather city={city.name}/>
                })}
            </div>
        </div>
    );
}

export default CitiesWeather;