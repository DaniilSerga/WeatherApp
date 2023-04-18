import React from "react";
import classes from './CitiesWeather.module.css';
import loupe from '../assets/icons/loupe.webp'
import CityWeather from "./CityWeather";
import closeIcon from '../assets/icons/close.webp';

const CitiesWeather = ({ ...props }) => {
    return(
        <div className={classes.citiesWeather}>
            <div className={classes.closeModalSection}>
                <button className={classes.closeButton} onClick={() => props.setMenuActive(false)}>
                    <img src={closeIcon} alt='close modal'/>
                </button>
            </div>
            <div className={classes.searchSection}>
                <button className={classes.searchBar} onClick={() => props.setModalActive(true)}>
                    <img src={loupe} alt="Search cities weather"/>
                    <p>Search a city or airport</p>
                </button>
            </div>
            <div className={classes.citiesSection}>
                { props.currentCity && <CityWeather isCurrentLocation={true} city={props.currentCity} setCurrentCity={props.setCurrentCity} cityBackgroundClass={props.cityItemClass}/> }
                
                { props.citiesWeather && props.citiesWeather.map((city, index) => {
                    return <CityWeather selectedCities={props.selectedCities} setSelectedCities={props.setSelectedCities} removeCityItem={props.removeCityItem} city={city} key={index} setCurrentCity={props.setCurrentCity} cityBackgroundClass={props.cityItemClass}/>
                })}
            </div>
        </div>
    );
}

export default CitiesWeather;