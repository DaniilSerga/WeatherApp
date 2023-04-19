import React from "react";

const CityItem = ({clickEvent, city, classes}) => {
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
    );

    return(
        <li onClick={(event) => clickEvent(event, city)}>
            <div className={classes.dataContainer}>
                <h3>{city.name}</h3>
                <p>{regionNames.of(city.country.toUpperCase())}</p>
            </div>
        </li>
    );
}

export default CityItem;