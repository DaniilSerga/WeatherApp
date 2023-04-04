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
        isInitialized: false,
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
        if (weather && weather.value) {
            console.log('NOT UPDATED');
            console.log('lat: ' + weather.value.coord.lat);
            console.log('lon: ' + weather.value.coord.lon);
            console.log(forecast);

            setForecast({isLoading: true});
            service.getForecastByCoords({
                lat: weather.value.coord.lat,
                lon: weather.value.coord.lon,
            }).then(res => {
                setForecast({
                    isLoading: false,
                    data: res
                })
                console.log('UPDATED');
                console.log(forecast);
            });
        }
    }, [weather])

    useEffect(() => {
        console.log('INIT');
        setTimeout(() => {
            setWeather({isLoading: true});
            service.getCurrentWeather().then(res => {
                console.log(res);
                setWeather({isLoading: false, value: res});
            });

            setForecast({isLoading: true});
            service.getForecast().then(res => {
                setForecast({isLoading: false, data: res});
            })
        }, 3000);
    }, [])

    // useEffect(() => {
    //     console.log('iteration');

    //     if (weather) {
    //         setWeather({isLoading: true});
    //         service.getCurrentWeather().then(res => {
    //             setWeather({
    //                 isLoading: false, 
    //                 value: res
    //             });
    //         });

    //         setForecast({isLoading: true});
    //         service.getForecast().then(res => {
    //             setForecast({
    //                 isLoading: false,
    //                 data: res,
    //             });
    //         });
    //     }
    // }, []);

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
