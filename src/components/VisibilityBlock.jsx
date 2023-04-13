import React from "react";
import classes from './VisibilityBlock.module.css';
import icon from '../assets/icons/visibilityIcon.webp';

const Visibility = ({data}) => {
    return (
        <div className={classes.visibility}>
            <div className={classes.sectionHeader}>
                <img src={icon} alt="visibility"></img>
                <h2>visibility</h2>
            </div>
            <div className={classes.sectionBody}>
                <p className={classes.visibilityValue}>{Math.round(data / 1000)}</p>
                <p className={classes.info}>Visibility is good</p>
            </div>
        </div>
    )
}

export default Visibility;