import React from "react";
import classes from './HumidityBlock.module.css';
import icon from '../../assets/icons/humidityIcon.webp';

const Humidity = ({data}) => {
    return(
        <div className={classes.humidity}>
            <div className={classes.sectionHeader}>
                <img src={icon} alt='humidity'></img>
                <h2>Humidity</h2>
            </div>
            <div className={classes.sectionBody}>
                <p className={classes.humidityValue}>{data}</p>
                <p className={classes.info}>The dew point is 21° right now.</p>
            </div>
        </div>
    )
}

export default Humidity;