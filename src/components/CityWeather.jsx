import React, { useState, useEffect } from "react";
import classes from './CityWeather.module.css';
import Background from "./Background";
import closeIcon from '../assets/icons/close.webp'
import approveIcon from '../assets/icons/approveMark.webp';

const CityWeather = ({ removeCityItem, isCurrentLocation, city, setCurrentCity, cityBackgroundClass }) => {
    const [chosenCity, setChosenCity] = useState(city);

    const [cityTime, setCurrentTime] = useState(new Date(city.dt));

    useEffect(() => {
        setChosenCity(city);
    }, [city])

    useEffect(() => {
        if (!isCurrentLocation) {
            let timer = setInterval(() => {
                setCurrentTime(
                    new Date(cityTime.setSeconds(cityTime.getSeconds() + 1))
                );
            }, 1000);
    
            return () => {
                clearInterval(timer);
            }
        }
    }, []);

    const changeCurrentCity = () => {
        setCurrentCity({isLoading: false, value: chosenCity});
    }

    return (
        <div className={isCurrentLocation ? classes.currentCityWeather : classes.cityWeather}
            onClick={isCurrentLocation && (() => changeCurrentCity())}>
            { chosenCity &&
                <Background data={chosenCity} styleClass={cityBackgroundClass}/>
            }
            <div className={classes.cityWeatherContainer}>
                <div className={classes.cityInfoSection}>
                    <h3 className={classes.locationHeader}>{isCurrentLocation ? 'My location' : city.name}</h3>
                    <h4 className={classes.locationSubHeader}>{isCurrentLocation ? city.name : cityTime.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})}</h4>

                    <p className={classes.weatherOverview}>{chosenCity.weather[0].main}</p>
                </div>

                <div className={classes.weatherInfoSection}>
                    <p className={classes.temperature}>{Math.round(chosenCity.main.temp)}</p>
                    <div className={classes.extremeTemps}>
                        <p>H:{Math.round(chosenCity.main.temp_max)}</p>
                        <p>L:{Math.round(chosenCity.main.temp_min)}</p>
                    </div>
                </div>

                <div className={classes.deleteItemContainer}>
                    <div className={classes.deleteButtonSection} onClick={() => removeCityItem(city)}>
                        <img src={closeIcon} alt='delete selected city'/>
                    </div>
                    <div className={classes.selectButtonSection} onClick={() => changeCurrentCity()}>
                        <img src={approveIcon} alt='select city'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CityWeather;