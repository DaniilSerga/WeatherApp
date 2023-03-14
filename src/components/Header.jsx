import React from "react";
import classes from './Header.module.css';

const Header = ({isLoading, value}) => {
    if (!isLoading && value) {
        return (
            <header className={classes.headerSection}>
                <h2 className={classes.cityName}>{value.name}</h2>
                <h1 className={classes.temperature}>{Math.round(value.main.temp)}</h1>
                <p className={classes.description}>{value.weather[0].description}</p>
                <div className={classes.extremeTempSection}>
                    <p className={classes.extremeTemp}>H:{Math.round(value.main.temp_max)}</p>
                    <p className={classes.extremeTemp}>L:{Math.round(value.main.temp_min)}</p>
                </div>
            </header>
        )
    }

    return (
        <p className={classes.loadingSign}>
            Загрузка...
        </p>
    )
}

export default Header;