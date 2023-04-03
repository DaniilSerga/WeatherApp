import React from "react";
import classes from './UvIndex.module.css';
import icon from '../assets/icons/uviIcon.webp';

const UvIndex = ({data}) => {
    const getUviExpanation = (data) => {
        if (data >= 0 && data < 3) {
            return 'Low';
        } else if (data >= 3 && data < 6) {
            return 'Middle';
        } else if (data >= 6 && data < 8) {
            return 'High';
        } else if (data >= 8 && data < 11) {
            return 'Very high';
        } else if (data >= 11) {
            return 'Extreme';
        } else {
            return 'undefined';
        }
    }

    return(
        <div className={classes.uvIndex}>
            <div className={classes.sectionHeader}>
                <img src={icon} alt='uviIndex'></img>
                <p>uv index</p>
            </div>
            <div className={classes.sectionBody}>
                <p className={classes.uvi}>{data}</p>
                <p className={classes.uviDefinition}> {getUviExpanation(data)} </p>
                
                <div className={classes.uviGraphContainer}>
                    <div className={classes.uviGraph}>
                        
                    </div>
                </div>
                
                <p className={classes.uviForecast}>{getUviExpanation(data)} for the rest of the day</p>
            </div>
        </div>
    )
}

export default UvIndex;