import React from "react";
import classes from './FeelsLikeBlock.module.css';
import icon from '../../assets/icons/feelsLikeIcon.webp';

const FeelsLike = ({data}) => {
    return(
        <div className={classes.feelsLike}>
            <div className={classes.sectionHeader}>
                <img src={icon} alt='feels like'></img>
                <h2>Feels like</h2>
            </div>
            <div className={classes.sectionBody}>
                <p className={classes.temperature}>{Math.round(data)}</p>
                <p className={classes.info}>Similar to the actual temperature</p>
            </div>
        </div>
    )
}

export default FeelsLike;