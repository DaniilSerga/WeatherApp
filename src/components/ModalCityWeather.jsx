import React from "react";

const ModalCityWeather = ({city, classes}) => {
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
    );

    return(
        <li>
            <div className={classes.dataContainer}>
                <h3>{city.name}</h3>
                <p>{regionNames.of(city.country.toUpperCase())}</p>
            </div>
            <hr></hr>
        </li>
    );
}

export default ModalCityWeather;