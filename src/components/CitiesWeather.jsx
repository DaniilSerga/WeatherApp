import React from "react";
import classes from './CitiesWeather.module.css';
import loupe from '../assets/icons/loupe.webp'
import CityWeather from "./CityWeather";
import closeIcon from '../assets/icons/close.webp';

const CitiesWeather = ({setMenuActive, setModalActive, citiesWeather, currentCity, setCurrentCity}) => {
    return(
        <div className={classes.citiesWeather}>
            <div className={classes.closeModalSection}>
                <button className={classes.closeButton} onClick={() => setMenuActive(false)}>
                    <img src={closeIcon} alt='close modal'/>
                </button>
            </div>
            <div className={classes.searchSection}>
                <button className={classes.searchBar} onClick={() => setModalActive(true)}>
                    <img src={loupe} alt="Search cities weather"/>
                    <p>Search a city or airport</p>
                </button>
            </div>
            <div className={classes.citiesSection}>
                { currentCity && <CityWeather isCurrentLocation={true} city={currentCity} setCurrentCity={setCurrentCity}/> }

                { citiesWeather && citiesWeather.map((city, index) => {
                    return <CityWeather city={city} key={index} setCurrentCity={setCurrentCity}/>
                })}
            </div>
        </div>
    );
}

export default CitiesWeather;