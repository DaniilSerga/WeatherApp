import React from "react";
import backgrounds from '../constants/video-backgrounds';

const Background = ({isLoading, data}) => {
    if (!isLoading && data) {
        const displayedVideo = backgrounds.find(video => video.definition === data.weather[0].main.toLowerCase())
        
        return(
            <video className='backgroundVideo' tabIndex='-1' autoPlay loop muted>
                <source src={displayedVideo.video} type='video/mp4'/>
            </video>
        ); 
    }
}

export default Background;