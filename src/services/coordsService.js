const service = {
    getCurrentCoords: async () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                resolve({
                    lon: position.coords.longitude,
                    lat: position.coords.latitude,
                });
            }, reject);
        });
    }
}

export default service;