import React from "react";

const Header = ({isLoading, ...props}) => {
    if (!isLoading && props.value) {
        return (
            <h1>{Math.round(props.value.main.temp)}</h1>
        )
    }

    return (
        <p style={{ textAlign: 'center', fontSize: '30px' }}>
            Hold on, fetching data may take some time :)
        </p>
    )
}

export default Header;