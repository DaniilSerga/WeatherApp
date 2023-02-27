import React, { useState, useEffect } from "react";
import Forecast from './Forecast';
import service from '../services/openWeather';

const ForecastList = ({data}) => {
    return(
        <div>
            <ul>
                {
                !data ? <h2>Загрузка...</h2> :
                 data.map((weather) => 
                    <li>
                        <p>{weather.date}</p>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default ForecastList;