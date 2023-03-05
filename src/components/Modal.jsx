import React from "react";
import classes from './Modal.module.css';
import closeImg from '../assets/icons/close.png';
import loupeImg from '../assets/icons/loupe.png';

const Modal = ({modalActive, setModalActive}) => {
    if (!modalActive) {
        return;
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
                        <input placeholder="Enter any city..."></input>
                    </div>

                    <div className={classes.formContainer}>
                        <ul>
                            <li className={classes.checked}>
                                <div className={classes.dataContainer}>
                                    <h3>Minsk</h3>
                                    <p>Belarus</p>
                                </div>
                                <hr></hr>
                            </li>
                            <li>
                                <h3>Washington</h3>
                                <p>USA</p>
                                <hr/>
                            </li>
                            <li>
                                <h3>Paris</h3>
                                <p>France</p>
                                <hr></hr>
                            </li>
                        </ul>
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