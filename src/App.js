import React, { useEffect, useState } from 'react';
import classes from './App.module.css';
import Background from './components/Background';
import CitiesWeather from './components/SideMenu/CitiesWeather';
import ForecastList from './components/ForecastBlock/ForecastList';
import Header from './components/Header';
import Modal from './components/ModalWindow/Modal';
import AdditionalInfo from './components/AdditionalInfo';
import service from './services/openWeather';
import menuIcon from './assets/icons/menu.webp'

function App() {
    const [currentCityWeather, setCurrentCityWeather] = useState({
        isLoading: false,
        value: null,
    });
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
    const [selectedCities, setSelectedCities] = useState(JSON.parse(localStorage.getItem('selectedCities')) || []);
    
    useEffect(() => {
        setWeather({ isLoading: true });
        setCurrentCityWeather({ isLoading: true });
        service.getCurrentWeather().then(res => {
            setWeather({ isLoading: false, value: res });
            setCurrentCityWeather({ isLoading: false, value: res });
        });

        setForecast({ isLoading: true });
        service.getForecast().then(res => {
            setForecast({ isLoading: false, data: res });
        });

        let arr = [];

        if (selectedCities) {
            service.updateCitiesWeather(selectedCities).then(res => {
                arr = [...arr, res].flat(1);
            }).then(() => {
                setSelectedCities(arr);
            });
        }
    }, [])

    useEffect(() => {
        if (weather && weather.value) {
            setForecast({ isLoading: true });
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

    useEffect(() => {
        localStorage.setItem('selectedCities', JSON.stringify(selectedCities));
    }, [selectedCities]);

    const removeCityItem = (cityItem) => {
        setSelectedCities(
            selectedCities.filter(city => city.id !== cityItem.id)
        );
    }

    return (
        <div className={classes.app}>
            {!weather.isLoading && weather.value &&
                <div className={classes.videoContainer}>
                    <Background data={weather.value} styleClass={classes.backgroundVideo} />
                </div>
            }

            <div className={classes.header}>
                {!weather.isLoading && weather.value &&
                    <Header value={weather.value} />
                }
            </div>

            <div className={classes.infoSection}>
                {!forecast.isLoading && forecast.data && !weather.isLoading && weather.value &&
                    <div className={classes.weatherInfo}>
                        <ForecastList data={forecast.data} />
                        <div className={classes.additionalInfo}>
                            <AdditionalInfo currentWeather={weather.value} />
                        </div>
                    </div>
                }
            </div>

            <div className={classes.sideMenu}>
                <button className={classes.menuIconContainer} onClick={() => setMenuActive(!menuActive)}>
                    <img src={menuIcon} alt='menu'/>
                </button>
            </div>

            { menuActive &&
                <div className={classes.menuCitiesSection}>
                    {!weather.isLoading && weather.value &&
                        <CitiesWeather 
                            setMenuActive={setMenuActive} 
                            removeCityItem={removeCityItem} 
                            setModalActive={setModalActive} 
                            citiesWeather={selectedCities} 
                            chosenCity={weather.value} 
                            setChosenCity={setWeather} 
                            currentCity={currentCityWeather.value}
                            cityItemClass={classes.cityBackgroundVideo} 
                            setSelectedCities={setSelectedCities} 
                            selectedCities={selectedCities}
                        />
                    }
                </div>
            }

            <div className={classes.citiesSection}>
                {!weather.isLoading && weather.value &&
                    <CitiesWeather 
                        removeCityItem={removeCityItem} 
                        setModalActive={setModalActive} 
                        citiesWeather={selectedCities} 
                        chosenCity={weather.value} 
                        setChosenCity={setWeather} 
                        currentCity={currentCityWeather.value}
                        cityItemClass={classes.cityBackgroundVideo} 
                        setSelectedCities={setSelectedCities} 
                        selectedCities={selectedCities}
                    />
                }
            </div>

            {modalActive &&
                <Modal setModalActive={setModalActive} selectedCities={selectedCities} setSelectedCities={setSelectedCities} />
            }
        </div>
    );
}

export default App;
