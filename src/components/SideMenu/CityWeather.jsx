import React, { useState, useEffect, useMemo } from "react";
import classes from './CityWeather.module.css';
import Background from '../Background';
import closeIcon from './../../assets/icons/close.webp';
import approveIcon from './../../assets/icons/approveMark.webp';

const CityWeather = ({ removeCityItem, isCurrentLocation, currentCity, city, setCurrentCity, cityBackgroundClass }) => {
    const displayedVideo = useMemo(() => {
        if (isCurrentLocation) {
            return <Background data={currentCity} styleClass={cityBackgroundClass}/>;
        }

        return <Background data={city} styleClass={cityBackgroundClass}/>;
    }, [])

    const [cityTime, setCurrentTime] = useState(city && new Date(city.dt));

    useEffect(() => {
        if (isCurrentLocation) {
            return;
        }

        let timer = setInterval(() => {
            setCurrentTime(
                new Date(cityTime.setSeconds(cityTime.getSeconds() + 1))
            );
        }, 1000);
    
        return () => {
            clearInterval(timer);
        }
    }, []);

    const changeCurrentCity = (input) => {
        setCurrentCity({isLoading: false, value: input});
    }

    return (
        <div className={isCurrentLocation ? classes.currentCityWeather : classes.cityWeather}
            onClick={isCurrentLocation && (() => changeCurrentCity(currentCity))}>
            { displayedVideo }
            <div className={classes.cityWeatherContainer}>
                {
                    isCurrentLocation ?
                    <div className={classes.cityInfoSection}>
                        <h3 className={classes.locationHeader}>{'My location'}</h3>
                        <h4 className={classes.locationSubHeader}>{currentCity.name}</h4>
                        <p className={classes.weatherOverview}>{currentCity.weather[0].main}</p>
                    </div> :
                    <div className={classes.cityInfoSection}>
                        <h3 className={classes.locationHeader}>{city.name}</h3>
                        <h4 className={classes.locationSubHeader}>{cityTime.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})}</h4>
                        <p className={classes.weatherOverview}>{city.weather[0].main}</p>
                    </div>
                }

                { isCurrentLocation ?
                    <div className={classes.weatherInfoSection}>
                        <p className={classes.temperature}>{Math.round(currentCity.main.temp)}</p>
                        <div className={classes.extremeTemps}>
                            <p>H:{Math.round(currentCity.main.temp_max)}</p>
                            <p>L:{Math.round(currentCity.main.temp_min)}</p>
                        </div>
                    </div> :
                    <div className={classes.weatherInfoSection}>
                        <p className={classes.temperature}>{Math.round(city.main.temp)}</p>
                        <div className={classes.extremeTemps}>
                            <p>H:{Math.round(city.main.temp_max)}</p>
                            <p>L:{Math.round(city.main.temp_min)}</p>
                        </div>
                    </div>
                }

                <div className={classes.deleteItemContainer}>
                    <div className={classes.deleteButtonSection} onClick={() => removeCityItem(city)}>
                        <img src={closeIcon} alt='delete selected city'/>
                    </div>
                    <div className={classes.selectButtonSection} onClick={() => changeCurrentCity(city)}>
                        <img src={approveIcon} alt='select city'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CityWeather;