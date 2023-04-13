import React from "react";
import classes from './Header.module.css';

const Header = ({value}) => {
    return (
        <header className={classes.headerSection}>
            {/* Fix h1 and h2 tags (replace them) */}
            <h1 className={classes.cityName}>{value.name}</h1>
            <h2 className={classes.temperature}>{Math.round(value.main.temp)}</h2>
            <p className={classes.description}>{value.weather[0].description}</p>
            <div className={classes.extremeTempSection}>
                <p className={classes.extremeTemp}>H:{Math.round(value.main.temp_max)}</p>
                <p className={classes.extremeTemp}>L:{Math.round(value.main.temp_min)}</p>
            </div>
        </header>
    )
}

export default Header;