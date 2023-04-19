import React, { useMemo } from "react";
import getBackground from '../constants/video-backgrounds';

const Background = ({data, styleClass}) => {
    const displayedVideo = useMemo(() => 
        getBackground(data)
    , [data])

    return(
        <video src={displayedVideo.video} className={styleClass} tabIndex='-1' autoPlay loop muted/>
    )
}

export default Background;