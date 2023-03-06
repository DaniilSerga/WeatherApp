import React, {useState} from "react";
import classes from './Modal.module.css';
import closeImg from '../assets/icons/close.png';
import loupeImg from '../assets/icons/loupe.png';
import ModalCityWeather from "./ModalCityWeather";
import service from '../services/openWeather';

const Modal = ({modalActive, setModalActive}) => {
    const [cities, setCities] = useState({
        isLoading: false,
        data: null,
    });
    
    const checkCity = (event) => {
        if (!event.target.name === 'li') {
            return;
        }

        const liElement = event.target.closest('li');

        switch (liElement.className === classes.checked) {
            case true:
                liElement.className = '';
                break;
            case false:
                liElement.className = classes.checked;
                break;
            default:
                console.log('some error occured while trying to change li\'s class name');
        }
    }
    
    const fetchData = (event) => {
        if (!event.target.value) {
            return;
        }

        setCities({isLoading: true});
        service.getCitiesNames(event.target.value)
            .then(res => {
                setCities({
                    isLoading: false,
                    data: res,
                });
            });
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
                            { cities.data ? 
                                <>
                                    <ul onClick={(event) => checkCity(event)}>
                                        { cities.data.map(city => {
                                                return <ModalCityWeather city={city} classes={classes}/>
                                            })
                                        }
                                    </ul>
                                </>
                                : <p>Loading...</p>
                            }
                    </div>
                </div>
                <div className={classes.submitContainer}>
                    <button className={classes.submitButton}>OK</button>    
                </div>
            </div>
        </div>
    );
}

export default Modal;