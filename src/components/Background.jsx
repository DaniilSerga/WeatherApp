import React from "react";
import classes from './Background.module.css';
import backgrounds from '../constants/video-backgrounds';

const Background = ({isCityBackground, data}) => {
    console.log(data);
    const displayedVideo = backgrounds.find(video =>  data.weather[0].main.toLowerCase().includes(video.definition))
    
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