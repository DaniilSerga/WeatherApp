const BACKGROUNDS = [
    { definition: 'rain', video: require('../assets/videos/rain.mp4') }, 
    { definition: 'drizzle', video: require('../assets/videos/rain.mp4') },
    { definition: 'snow', video: require('../assets/videos/snow.mp4') }, 
    { definition: 'clear', video: require('../assets/videos/sunny.mp4') }, 
    { definition: 'sun', video: require('../assets/videos/sunny.mp4') }, 
    { definition: 'wind', video: require('../assets/videos/wind.mp4') },
    { definition: 'clouds', video: require('../assets/videos/clouds.mp4') },
    { definition: 'thunder', video: require('../assets/videos/thunder.mp4') },
    { definition: 'mist', video: require('../assets/videos/mist.mp4') },
];

const getBackground = (data) => {
    return BACKGROUNDS.find(video => data.weather[0].main.toLowerCase().includes(video.definition))
}

export default getBackground;