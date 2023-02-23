import React, { useState, useEffect } from "react";
import Forecast from './Forecast';
import service from '../services/openWeather';

const ForecastList = () => {
    const [forecast, setForecast] = useState({
        isLoading: false,
        data: null,
    });

    useEffect(() => {
        if (forecast) {
            setForecast({isLoading: true});
            service.getForecast().then(res => {
                console.log(res);
                setForecast({
                    isLoading: false,
                    data: res,
                });
            });
        }
    }, []);

    return(
        <div>
            <ul>
                {/* {forecast.map(weather => 
                    <li>
                        <p>{weather.name}</p>
                    </li>
                )} */}
            </ul>
        </div>
    );
}

export default ForecastList;