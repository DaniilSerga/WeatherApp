import React from "react";
import classes from './Modal.module.css';

const Modal = ({modalActive}) => {
    if (!modalActive) {
        return;
    }
    
    return (
        <div className={classes.modalWindow}>
            <div className={classes.formContainer}>
                <form>
                    <input></input>
                </form>
            </div>
        </div>
    );
}

export default Modal;