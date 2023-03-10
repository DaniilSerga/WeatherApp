import React from "react";

const Background = ({isLoading, data}) => {
    const VIDEOS = [
        { definition: 'rain', video: require('../assets/videos/rain.mp4') }, 
        { definition: 'snow', video: require('../assets/videos/snow.mp4') }, 
        { definition: 'sun', video: require('../assets/videos/sunny.mp4') }, 
        { definition: 'wind', video: require('../assets/videos/wind.mp4') },
        { definition: 'clouds', video: require('../assets/videos/clouds.mp4') },
        { definition: 'thinder', video: require('../assets/videos/thunder.mp4') },
    ]

    if (!isLoading && data) {
        // console.log(data);
        const displayedVideo = VIDEOS.find(video => video.definition === data.weather[0].main.toLowerCase())
        
        return(
            <video id='backgroundVideo' tabIndex='-1' autoPlay loop muted>
                <source src={displayedVideo.video} type='video/mp4'/>
            </video>
        ); 
    }
}

export default Background;