import React, { useState, useEffect } from "react";
import backgrounds from '../constants/video-backgrounds';
import classes from './CityBackground.module.css';

const CityBackground = ({data}) => {
    const getVideo = (data) => {
        return backgrounds.find(video => data.weather[0].main.toLowerCase().includes(video.definition));
    }

    const [displayedVideo, setDisplayedVideo] = useState(getVideo(data));

    useEffect(() => {
        setDisplayedVideo(getVideo(data));
    }, [data])

    return (
        <video src={displayedVideo.video} className={classes.cityBackgroundVideo} tabIndex='-1' autoPlay loop muted>
        </video>
    )
}

export default CityBackground;