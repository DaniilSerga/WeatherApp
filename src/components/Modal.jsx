import React, {useState} from "react";
import classes from './Modal.module.css';
import closeImg from '../assets/icons/close.webp';
import loupeImg from '../assets/icons/loupe.webp';
import CityItem from "./CityItem";
import service from '../services/openWeather';

const Modal = ({setModalActive, selectedCities, setSelectedCities}) => {
    const [cities, setCities] = useState({
        isLoading: false,
        data: [],
    });
    
    const [checkedLi, setCheckedLi] = useState();
    const [chosenCity, setChosenCity] = useState({});
    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    const submitCity = () => {
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
    
    const checkCity = (event, city) => {
        if (event.target.closest('li') === checkedLi) {
            checkedLi.className = '';
            setCheckedLi(null);
            setChosenCity(null)
            setSubmitButtonDisabled(true);
            return;
        }

        if (checkedLi) {
            checkedLi.className = '';
        }

        event.target.closest('li').className = classes.checked;
        setCheckedLi(event.target.closest('li'));
        setSubmitButtonDisabled(false);
        setChosenCity(city);
    }
    
    const fetchData = (value) => {
        if (!value.trim()) {
            setCities({ data: [] })
            return;
        }

        setCities({isLoading: true});
        const timeoutId = setTimeout(() => {
            service.getCitiesNames(value)
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
                        <input onChange={event => fetchData(event.target.value)} placeholder="Enter any city..."></input>
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
                                                return <CityItem clickEvent={checkCity} key={index} city={city} classes={classes}/>
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
                    <button className={classes.submitButton} onClick={() => submitCity()} disabled={isSubmitButtonDisabled}>OK</button>    
                </div>
            </div>
        </div>
    );
}

export default Modal;