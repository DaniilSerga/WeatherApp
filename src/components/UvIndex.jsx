import React from "react";
import classes from './UvIndex.module.css';
import icon from '../assets/icons/uviIcon.png';

const UvIndex = ({data}) => {
    let uviExpanation = 'undefined';

    if (data >= 0 && data < 3) {
        uviExpanation = 'Low';
    } else if (data >= 3 && data < 6) {
        uviExpanation = 'Middle';
    } else if (data >= 6 && data < 8) {
        uviExpanation = 'High';
    } else if (data >= 8 && data < 11) {
        uviExpanation = 'Very high';
    } else if (data >= 11) {
        uviExpanation = 'Extreme';
    }

    return(
        <>
            <div className={classes.uvIndex}>
                <div className={classes.sectionHeader}>
                    <img src={icon} alt='uviIndex'></img>
                    <p>uv index</p>
                </div>
                <div className={classes.sectionBody}>
                    <p className={classes.uvi}>{data}</p>
                    <p className={classes.uviDefinition}> {uviExpanation} </p>
                    <hr></hr>
                    <p className={classes.uviForecast}>{uviExpanation} for the rest of the day</p>
                </div>
            </div>
        </>
    )
}

export default UvIndex;