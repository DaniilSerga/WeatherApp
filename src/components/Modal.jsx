import React, {useState} from "react";
import classes from './Modal.module.css';
import closeImg from '../assets/icons/close.png';
import loupeImg from '../assets/icons/loupe.png';
import ModalCityWeather from "./ModalCityWeather";
import service from '../services/openWeather';

const Modal = ({setModalActive, selectedCities, setSelectedCities}) => {
    const [cities, setCities] = useState({
        isLoading: false,
        data: [],
    });
    
    const [chosenCity, setChosenCity] = useState({});
    const [isSubmitButtonActive, setSubmitButtonActive] = useState(true);

    const submitCity = () => {
        console.log('CHOSEN CITY');
        console.log(chosenCity);
        
        service.getCurrentWeatherByCityCoords({
            lon: chosenCity.longitude, 
            lat: chosenCity.latitude
        }).then(res => {
            setSelectedCities((prevCities) => [
                ...prevCities, res
            ]);
        })

        setModalActive(false);
    }

    const checkCity = (event) => {
        if (!event.target.name === 'li') {
            return;
        }

        const clickedLi = event.target.closest('li');
        
        switch (clickedLi.className.includes('checked')) {
            case true:
                clickedLi.className = '';
                setSubmitButtonActive(true);
                break;
            case false:
                clickedLi.className = classes.checked;
                setSubmitButtonActive(false);

                const index = Array.prototype.indexOf.call(clickedLi.closest('ul').childNodes, clickedLi);

                setChosenCity(cities.data[index]);

                break;
            default:
                console.log('Some error occured while trying to select a city');
        }
    }
    
    const fetchData = (event) => {
        if (!event.target.value.trim()) {
            setCities({ data: [] })
            return;
        }

        setCities({isLoading: true});
        const timeoutId = setTimeout(() => {
            service.getCitiesNames(event.target.value)
                .then(res => {
                    setCities({
                        isLoading: false,
                        data: res,
                    });
                });
        }, 1000);
    
        clearTimeout(timeoutId - 1);
    }

    return (
        <div className={classes.modalContainer}>
            <div className={classes.modalWindow}>
                <div className={classes.closeModalContainer}>
                    <button className={classes.closeModal} onClick={() => setModalActive(false)}>
                        <img src={closeImg} alt="close"></img>
                    </button>
                </div>
                <div className={classes.modalForm}>
                    <div className={classes.modalHeader}>
                        <img src={loupeImg} alt="search"></img>
                        <input onChange={event => fetchData(event)} placeholder="Enter any city..."></input>
                    </div>

                    <div className={classes.formContainer}>
                        {
                            cities.data ?
                            <>
                                {
                                    cities.data.length === 0 ?
                                    <p>Nothing was found</p> :
                                    <ul>
                                        {
                                            cities.data.map((city, index) => {
                                                return <ModalCityWeather clickEvent={checkCity} key={index} city={city} classes={classes}/>
                                            })
                                        }
                                    </ul>
                                }
                            </> 
                            : <p>Loading...</p>
                        }
                    </div>
                </div>
                <div className={classes.submitContainer}>
                    <button className={classes.submitButton} onClick={() => submitCity()} disabled={isSubmitButtonActive}>OK</button>    
                </div>
            </div>
        </div>
    );
}

export default Modal;