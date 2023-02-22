import React from 'react';
import './App.css';
import video from './assets/videos/whiteClouds.mp4'

function App() {
    return (
        <div className="App">
            <div className='videoContainer'>
                <video id='backgroundVideo' tabIndex='-1' autoPlay loop muted>
                    <source src={video} type='video/mp4'/>
                </video>
            </div>
        </div>
    );
}

export default App;
