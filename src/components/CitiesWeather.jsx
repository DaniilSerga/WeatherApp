import React from "react";
import classes from './CitiesWeather.module.css';
import loupe from '../assets/icons/loupe.png'
import CityWeather from "./CityWeather";

const CitiesWeather = ({setModalActive, citiesWeather, currentCity, setCurrentCity}) => {
    return(
        <div className={classes.citiesWeather}>
            <div className={classes.searchSection}>
                <button className={classes.searchBar} onClick={() => setModalActive(true)}>
                    <img src={loupe} alt="Search cities weather"/>
                    <p>Search a city or airport</p>
                </button>
            </div>
            <div className={classes.citiesSection}>
                { currentCity && <CityWeather isCurrentLocation={true} city={currentCity}/> }

                { citiesWeather && citiesWeather.map((city, index) => {
                    return <CityWeather city={city} key={index}/>
                })}
            </div>
        </div>
    );
}

export default CitiesWeather;