import React from "react";
import classes from './FeelsLike.module.css';
import icon from '../assets/icons/feelsLikeIcon.png';

const FeelsLike = ({data}) => {
    return(
        <div className={classes.feelsLike}>
            <div className={classes.sectionHeader}>
                <img src={icon} alt='feels like'></img>
                <p>Feels like</p>
            </div>
            <div className={classes.sectionBody}>
                <p className={classes.temperature}>{Math.round(data)}</p>
                <p className={classes.info}>Similar to the actual temperature</p>
            </div>
        </div>
    )
}

export default FeelsLike;