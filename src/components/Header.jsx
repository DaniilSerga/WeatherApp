import React from "react";

const Header = ({temperatureFarenheit}) => {
    console.log('\nГОРОД')
    console.log(temperatureFarenheit);
    return(
        <div>
            {/* <h1>{Math.round((temperatureFarenheit - 32) * 5 - 9)}</h1> */}
            <h1>{temperatureFarenheit}</h1>
        </div>
    );
}

export default Header;