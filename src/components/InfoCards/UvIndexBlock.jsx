import React, { useMemo } from "react";
import classes from './UvIndexBlock.module.css';
import icon from '../../assets/icons/uviIcon.webp';
import uvi from '../../constants/uviExpanation';

const UvIndex = ({data}) => {
    const uviExpanation = useMemo(() => uvi.getExpanation(data), [data]);

    return(
        <div className={classes.uvIndex}>
            <div className={classes.sectionHeader}>
                <img src={icon} alt='uviIndex'></img>
                <h2>uv index</h2>
            </div>
            <div className={classes.sectionBody}>
                <p className={classes.uvi}>{data}</p>
                <p className={classes.uviDefinition}> {uviExpanation} </p>
                
                <div className={classes.uviGraphContainer}>
                    <div className={classes.uviGraph}></div>
                </div>
                
                <p className={classes.uviForecast}>{uviExpanation} for the rest of the day</p>
            </div>
        </div>
    )
}

export default UvIndex;