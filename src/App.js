import React, { useEffect, useState } from 'react';
import './App.css';
import video from './assets/videos/whiteClouds.mp4'
import Header from './components/Header';
import getWeather from './services/openWeather';

function App() {
    const [weather, setWeather] = useState('kzkzkz');

    useEffect(() => {
        if (weather) {
            getWeather(setWeather);
        }
    }, []);
    
    return (
        <div className="App">
            {
                weather ? <Header value={weather}/> : <h1>Загрузка</h1>
                // weather !== undefined ? 
                // <p>{weather.main.humidity}</p> : 
                // <p>Loading...</p>
            }
            <div className='videoContainer'>
                <video id='backgroundVideo' tabIndex='-1' autoPlay loop muted>
                    <source src={video} type='video/mp4'/>
                </video>
            </div>
        </div>
    );
}

export default App;
