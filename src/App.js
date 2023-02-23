import React, { useEffect, useState } from 'react';
import './App.css';
import video from './assets/videos/whiteClouds.mp4'
import Header from './components/Header';
import getWeather from './services/openWeather';

function App() {
    const [weather, setWeather] = useState({
        isLoading: false,
        value: null
    });

    useEffect(() => {
        if (weather) {
            setWeather({isLoading: true});
            getWeather().then(res => {
                setWeather({loading: false, value: res});
            });
        }
    }, []);

    return (
        <div className="App">
            <Header isLoading={weather.isLoading} value={weather.value}/>
            <div className='videoContainer'>
                <video id='backgroundVideo' tabIndex='-1' autoPlay loop muted>
                    <source src={video} type='video/mp4'/>
                </video>
            </div>
        </div>
    );
}

export default App;
