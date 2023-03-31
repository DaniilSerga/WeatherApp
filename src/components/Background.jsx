import React from "react";
import classes from './Background.module.css';
import backgrounds from '../constants/video-backgrounds';

const Background = ({isCityBackground, data}) => {
    const displayedVideo = backgrounds.find(video => video.definition === data.weather[0].main.toLowerCase())
    
    if (!isCityBackground) {
        return(
            <video className={classes.backgroundVideo} tabIndex='-1' autoPlay loop muted>
                <source src={displayedVideo.video} type='video/mp4'/>
            </video>
        )
    } else {
        return(
            <video className={classes.cityBackgroundVideo} tabIndex='-1' autoPlay loop muted>
                <source src={displayedVideo.video} type='video/mp4'/>
            </video>
        )
    }
}

export default Background;