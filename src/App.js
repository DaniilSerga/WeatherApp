import React, { useEffect, useState } from 'react';
import './App.css';
import Background from './components/Background';
import CitiesWeather from './components/CitiesWeather';
import ForecastList from './components/ForecastList';
import Header from './components/Header';
import Modal from './components/Modal';
import AdditionalInfo from './components/AdditionalInfo';
import service from './services/openWeather';
import menuIcon from './assets/icons/menu.webp'

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
    const [menuActive, setMenuActive] = useState(false);

    
    
    useEffect(() => {
        setWeather({isLoading: true});
        service.getCurrentWeather().then(res => {
            setWeather({isLoading: false, value: res});
        });

        setForecast({isLoading: true});
        service.getForecast().then(res => {
            setForecast({isLoading: false, data: res});
        });

        const selectedCitiesFromJson = JSON.parse(localStorage.getItem('selectedCities'));

        if (selectedCitiesFromJson) {
            selectedCitiesFromJson.forEach(city => {
                city = service.getCurrentWeatherByCityCoords({
                    lon: city.coord.lon,
                    lat: city.coord.lat
                });
            })
            setSelectedCities(selectedCitiesFromJson);
        }
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
        selectedCities.forEach(selectedCity => {
            selectedCity = service.getCurrentWeatherByCityCoords({
                lon: selectedCity.coord.lon,
                lat: selectedCity.coord.lat
            });
        });
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

            <div className='sideMenu'>
                <button className='menuIconContainer' onClick={() => setMenuActive(!menuActive)}>
                    <img src={menuIcon} alt='menu'/>
                </button>
            </div>

            { menuActive &&
                <div className='menuCitiesSection'>
                    { !weather.isLoading && weather.value &&
                        <CitiesWeather setMenuActive={setMenuActive} setModalActive={setModalActive} citiesWeather={selectedCities} currentCity={weather.value} setCurrentCity={setWeather}/>
                    }
                </div>
            }

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
