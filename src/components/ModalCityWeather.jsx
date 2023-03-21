import React from "react";

const ModalCityWeather = ({clickEvent, city, classes}) => {
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
    );

    return(
        <li onClick={clickEvent}>
            <div className={classes.dataContainer}>
                <h3>{city.name}</h3>
                <p>{regionNames.of(city.country.toUpperCase())}</p>
            </div>
            <hr></hr>
        </li>
    );
}

export default ModalCityWeather;