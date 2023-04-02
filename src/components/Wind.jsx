import React from "react";
import classes from './Wind.module.css';
import icon from '../assets/icons/wind.webp';
import compass from '../assets/icons/compass.webp'

const Wind = ({data}) => {
    return(
        <>
            <div className={classes.wind}>
                <div className={classes.sectionHeader}>
                    <img src={icon} alt='wind speed'></img>
                    <p>Wind</p>
                </div>
                <div className={classes.sectionBody}>
                    <img src={compass} alt='wind speed'></img>
                    <p className={classes.windSpeed}>{Math.round(data)} m/s</p>
                </div>
            </div>
        </>
    )
}

export default Wind;