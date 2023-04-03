import React, {useState, useEffect} from "react";
import classes from './Sunrise.module.css';
import icon from '../assets/icons/sunrise.webp';
import graph from '../assets/icons/sunriseGraph.webp';

const Sunrise = ({data}) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        let timer = setInterval(() => setCurrentTime(new Date()), 1000);

        return () => {
            clearInterval(timer);
        }
    })

    return(
        <div className={classes.sunrise}>
            <div className={classes.sectionHeader}>
                <img src={icon} alt='surise'></img>
                <p>Sunrise</p>
            </div>
            <div className={classes.sectionBody}>
                <p className={classes.currentTime}>
                    {currentTime.toLocaleTimeString('en-us', {hour: '2-digit', minute: '2-digit'})}
                </p>
                <img src={graph} alt='sunrise graph'></img>
                <p className={classes.sunriseTime}>
                    Sunrise: {new Date(data * 1000).toLocaleTimeString('en-us', {hour: '2-digit', minute: '2-digit'})}
                </p>
            </div>
        </div>
    )
}

export default Sunrise;