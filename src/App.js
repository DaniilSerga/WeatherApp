import React, { useEffect, useState } from 'react';
import './App.css';
import Background from './components/Background';
import CitiesWeather from './components/CitiesWeather';
import ForecastList from './components/ForecastList';
import Header from './components/Header';
import Modal from './components/Modal';
import UvSection from './components/UvSection';
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

    const [modalActive, setModalActive] = useState(false);

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
                setForecast({
                    isLoading: false,
                    data: res,
                });
            });
        }
    }, []);

    return (
        <div className='App'>
            <div className='videoContainer'>
                <Background isLoading={weather.isLoading} data={weather.value}/>
            </div>
            
            <div className='infoSection'>
                <Header isLoading={weather.isLoading} value={weather.value}/>
                <div className='weatherInfo'>
                    <ForecastList data={forecast.data}/>
                    <div className='additionalInfo'>
                        <UvSection/>
                    </div>
                </div>
            </div>
            <div className='citiesSection'>
                <CitiesWeather setModalActive={setModalActive}/>
            </div>

            {modalActive && <Modal setModalActive={setModalActive}/>}
        </div>
    );
}

export default App;
