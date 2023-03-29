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

    const [selectedCities, setSelectedCities] = useState({
        isLoading: false,
        data: [],
        weather: []
    });

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

            setSelectedCities({isLoading: true});
            setSelectedCities({
                isLoading: false,
                data: [weather.value, ...selectedCities.data]
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

    useEffect(() => {
        if (selectedCities && selectedCities.data) {
            setSelectedCities({isLoading: true});
            selectedCities.data.forEach(city => {
                service.getCurrentWeatherByCityCoords({lon: city.longitude, lat: city.latitude}).then(res => {
                    setSelectedCities({
                        isLoading: true,
                        data: [...selectedCities.data],
                        weather: [...selectedCities.weather, res]
                    })
                })
            })
        }
    }, [selectedCities, setSelectedCities])

    return (
        <div className='app'>
            { !weather.isLoading && weather.value && 
                <div className='videoContainer'>
                    <Background data={weather.value}/>
                </div>
            }
            
            <div className='header'>
                { !weather.isLoading && weather.value && 
                    <Header isLoading={weather.isLoading} value={weather.value}/>
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
                <CitiesWeather setModalActive={setModalActive} citiesWeather={selectedCities.data}/>
            </div>

            { modalActive && <Modal setModalActive={setModalActive} selectedCities={selectedCities} setSelectedCities={setSelectedCities}/> }
        </div>
    );
}

export default App;
