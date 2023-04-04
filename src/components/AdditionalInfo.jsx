import React, { useEffect, useState } from "react";
import service from '../services/openWeather';
import classes from './AdditionalInfo.module.css';
import FeelsLike from "./FeelsLike";
import HourlyWeather from "./HourlyWeather";
import Humidity from "./Humidity";
import Sunrise from "./Sunrise";
import UvIndex from "./UvIndex";
import Visibility from "./Visibility";
import Wind from "./Wind";

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
                <UvIndex data={weather.value.current.uvi}/>
                <Sunrise data={weather.value.current.sunrise}/>
                <Wind data={weather.value.current.wind_speed}/>
                <FeelsLike data={weather.value.current.feels_like}/>
                <Humidity data={weather.value.current.humidity}/>
                <Visibility data={weather.value.current.visibility}/>
            </div>
        </div>
    );
}

export default AdditionalInfo;