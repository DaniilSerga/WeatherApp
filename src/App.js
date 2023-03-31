import React, { useEffect, useState } from 'react';
import './App.css';
import Background from './components/Background';
import CitiesWeather from './components/CitiesWeather';
import ForecastList from './components/ForecastList';
import Header from './components/Header';
import Modal from './components/Modal';
import AdditionalInfo from './components/AdditionalInfo';
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

    const [selectedCities, setSelectedCities] = useState([]);

    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        if (weather) {
            setWeather({isLoading: true});
            service.getCurrentWeather().then(res => {
                setWeather({
                    isLoading: false, 
                    value: res
                });
            });

        }
        
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
        <div className='app'>
            { !weather.isLoading && weather.value && 
                <div className='videoContainer'>
                    <Background data={weather.value}/>
                </div>
            }
            
            <div className='header'>
                { !weather.isLoading && weather.value && 
                    <Header value={weather.value}/>
                }
            </div>
            
            <div className='infoSection'>
                <div className='weatherInfo'>
                    <ForecastList data={forecast.data}/>
                    <div className='additionalInfo'>
                        <AdditionalInfo/>
                    </div>
                </div>
            </div>
            <div className='citiesSection'>
                <CitiesWeather setModalActive={setModalActive} citiesWeather={selectedCities} currentCity={weather.value} setCurrentCity={setWeather}/>
            </div>

            { modalActive && <Modal setModalActive={setModalActive} selectedCities={selectedCities} setSelectedCities={setSelectedCities}/> }
        </div>
    );
}

export default App;
