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


    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        setWeather({isLoading: true});
        service.getCurrentWeather().then(res => {
            setWeather({isLoading: false, value: res});
        });

        setForecast({isLoading: true});
        service.getForecast().then(res => {
            setForecast({isLoading: false, data: res});
        })
    }, [])

    useEffect(() => {
        if (weather && weather.value) {
            setForecast({isLoading: true});
            service.getForecastByCoords({
                lat: weather.value.coord.lat,
                lon: weather.value.coord.lon,
            }).then(res => {
                setForecast({
                    isLoading: false,
                    data: res
                })
            });
        }
    }, [weather])

    const [selectedCities, setSelectedCities] = useState(JSON.parse(localStorage.getItem('selectedCities')) || []);

    useEffect(() => {
        localStorage.setItem('selectedCities', JSON.stringify(selectedCities));
    }, [selectedCities]);

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
                { !forecast.isLoading && forecast.data && !weather.isLoading && weather.value &&
                    <div className='weatherInfo'>
                        <ForecastList data={forecast.data}/>
                        <div className='additionalInfo'>
                            <AdditionalInfo currentWeather={weather.value}/>
                        </div>
                    </div>
                }
            </div>
            <div className='citiesSection'>
                { !weather.isLoading && weather.value &&
                    <CitiesWeather setModalActive={setModalActive} citiesWeather={selectedCities} currentCity={weather.value} setCurrentCity={setWeather}/>
                }
            </div>

            { modalActive && 
                <Modal setModalActive={setModalActive} selectedCities={selectedCities} setSelectedCities={setSelectedCities}/> 
            }
        </div>
    );
}

export default App;
