import React, { useMemo } from "react";
import backgrounds from '../constants/video-backgrounds';

const Background = ({data, styleClass}) => {
    const displayedVideo = useMemo(() => 
        backgrounds.find(video => data.weather[0].main.toLowerCase().includes(video.definition))
    , [data])

    return(
        <video src={displayedVideo.video} className={styleClass} tabIndex='-1' autoPlay loop muted/>
    )
}

export default Background;