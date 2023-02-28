import React, { useEffect, useState } from 'react';
import './App.css';
import video from './assets/videos/rain.mp4'
import ForecastList from './components/ForecastList';
import Header from './components/Header';
import service from './services/openWeather';

function App() {
    const [weather, setWeather] = useState({
        isLoading: false,
        value: null,
    });

    const [forecast, setForecast] = useState({
        isLoading: false,
        data: null,
    });
    
    useEffect(() => {
        if (weather) {
            setWeather({isLoading: true});
            service.getCurrentWeather().then(res => {
                setWeather({isLoading: false, value: res});
            });
        }
    }, []);

    useEffect(() => {
        if (forecast) {
            setForecast({isLoading: true});
            service.getForecast().then(res => {
                // console.log(res);

                setForecast({
                    isLoading: false,
                    data: res,
                });

                console.log(forecast.data);
            });
        }
    }, []);
    
    return (
        <div className="App">
            <div className='videoContainer'>
                <video id='backgroundVideo' tabIndex='-1' autoPlay loop muted>
                    <source src={video} type='video/mp4'/>
                </video>
            </div>
            
            <div className='leftSide'>
                <Header isLoading={weather.isLoading} value={weather.value}/>
                <ForecastList data={forecast.data}/>
            </div>
            <div className='rightSide'>

            </div>
        </div>
    );
}

export default App;
