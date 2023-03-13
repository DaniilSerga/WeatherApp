import React, { useEffect, useState } from "react";
import service from '../services/openWeather';
import classes from './UvSection.module.css';

const UvSection = () => {
    const [uvIndex, setUvIndex] = useState({
        isLoading: false,
        value: null,
    });

    useEffect(() => {
        if (uvIndex) {
            setUvIndex({ isLoading: true });
            // service.getUV().then(res => {
            //     console.log(res);
            //     setUvIndex({
            //         isLoading: false,
            //         value: res,
            //     })
            // })
        }
    }, []);

    return(
        <>
            <div className={classes.uviContainer}>
                <p>Ауе</p>
            </div>
        </>
    );
}

export default UvSection;