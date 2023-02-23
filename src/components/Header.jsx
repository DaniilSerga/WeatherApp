import React from "react";
import classes from './Header.module.css';

const Header = ({isLoading, ...props}) => {
    if (!isLoading && props.value) {
        return (
            <div className={classes.header}>
                <h1 className={classes.temperature}>{Math.round(props.value.main.temp)}</h1>
            </div>
        )
    }

    return (
        <p style={{ textAlign: 'center', fontSize: '30px' }}>
            Загрузка...
        </p>
    )
}

export default Header;