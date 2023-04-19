import React, { useEffect, useState } from "react";
import service from '../services/openWeather';
import classes from './AdditionalInfo.module.css';
import FeelsLikeBlock from "./InfoCards/FeelsLikeBlock";
import HourlyWeather from "./HourlyWeatherBlock/HourlyWeather";
import HumidityBlock from "./InfoCards/HumidityBlock";
import SunriseBlock from "./InfoCards/SunriseBlock";
import UvIndexBlock from "./InfoCards/UvIndexBlock";
import VisibilityBlock from "./InfoCards/VisibilityBlock";
import WindBlock from "./InfoCards/WindBlock";

const AdditionalInfo = ({currentWeather}) => {
    const [weather, setWeather] = useState({
        isLoading: false,
        value: null,
    });

    useEffect(() => {
        setWeather({isLoading: true});
        service.getAdditionalCurrentWeather({
            lon: currentWeather.coord.lon,
            lat: currentWeather.coord.lat
        }).then(res => {
            setWeather({
                isLoading: false, 
                value: res
            });
        });
    }, [currentWeather]);

    if (!weather.value || weather.isLoading) {
        return(
            <p>Loading...</p>
        )
    }

    return(
        <div className={classes.additionalDataContainer}>
            <HourlyWeather data={weather.value.hourly.slice(0, 10)}/>

            <div className={classes.additionalData}>
                    <UvIndexBlock data={weather.value.current.uvi}/>
                    <SunriseBlock data={weather.value.current.sunrise}/>
                    <WindBlock data={weather.value.current.wind_speed}/>
                    <FeelsLikeBlock data={weather.value.current.feels_like}/>
                    <HumidityBlock data={weather.value.current.humidity}/>
                    <VisibilityBlock data={weather.value.current.visibility}/>
            </div>
        </div>
    );
}

export default AdditionalInfo;