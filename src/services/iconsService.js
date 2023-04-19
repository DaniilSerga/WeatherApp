const service = {
    getWeatherIcon: (wmoCode) => {
        if (wmoCode < 2) {
            return {
                description: 'Sunny',
                icon: "http://openweathermap.org/img/wn/01d@2x.png",
            };
        } else if (wmoCode === 2) {
            return {
                description: 'Partly cloudy',
                icon: "http://openweathermap.org/img/wn/02d@2x.png",
            };
        } else if (wmoCode === 3) {
            return {
                description: 'Cloudy',
                icon: "http://openweathermap.org/img/wn/03d@2x.png",
            };
        } else if (wmoCode === 45 || wmoCode === 48) {
            return {
                description: 'Foggy',
                icon: "http://openweathermap.org/img/wn/50d@2x.png",
            };
        } else if ((wmoCode > 50 && wmoCode < 58) || (wmoCode >= 80 && wmoCode < 83 )) {
            return {
                description: 'Rainy',
                icon: "http://openweathermap.org/img/wn/09d@2x.png"
            };
        } else if (wmoCode > 60 && wmoCode < 68) {
            return {
                description: 'Rainy',
                icon: "http://openweathermap.org/img/wn/10d@2x.png",
            };
        } else if ((wmoCode > 70 && wmoCode < 78) || wmoCode === 85 || wmoCode === 86) {
            return {
                description: 'Rainy',
                icon: "http://openweathermap.org/img/wn/13d@2x.png",
            };
        } else if (wmoCode > 90) {
            return {
                description: 'Rainy',
                icon: "http://openweathermap.org/img/wn/11d@2x.png"
            };
        } else {
            return null;
        }
    }
}

export default service;