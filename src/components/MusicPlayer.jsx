import React, { useRef } from 'react'
import { musicData } from '/Users/David/Code and Programming/Apps/music-player/src/data/musicData.js';
import { Play } from 'react-feather'
import { Pause } from 'react-feather'
import { SkipBack } from 'react-feather'
import { SkipForward } from 'react-feather'

export default function MusicPlayer({isPlaying, setIsPlaying, currentSong, setBackground, setCurrentSong, audioElement }) {

    const playPause = () => {
        isPlaying ? audioElement.current.pause() : audioElement.current.play()
    }
        
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const skipTrack = (direction) => {
        const currentIndex = musicData.findIndex((track) => track.id === currentSong.id);
        let newIndex = currentIndex + direction;
        if (newIndex < 0) {
            newIndex = musicData.length -1
        } else if (newIndex >= musicData.length) {
            newIndex = 0
        }
        setCurrentSong(musicData[newIndex]);
        setBackground(musicData[newIndex])
    }

    const songLength = (time) => {
        return (
            Math.floor(time / 60) + ':' + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const songTime = () => {
        const time = currentSong.currentTime;
        let seconds = parseInt(time % 60);
        let minutes = parseInt((time / 60) % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        const songTime = minutes + ':' + seconds;
        return songTime;
    }

    const clickRef = useRef()

    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const trackProgress = offset / width * 100;
        audioElement.current.currentTime = trackProgress / 100 * currentSong.length;
    }
    
  return (

    <div className='music-container'>
        <div className='player-controls'>
            <div className='track-progress'>
                <div className='time'>{songTime(currentSong.currentTime)}</div>

                <span className='progress-bar' onClick={checkWidth} ref={clickRef}>
                    <div className='seek-bar' style={{width: `${currentSong.progress+"%"}`}}></div>
                </span>

                <div className='length'>{songLength(currentSong.length)}</div>
            </div>

            <div className='controls'>
                <div onClick={() => skipTrack(-1)} className='back'><SkipBack /></div>

                <div onClick={()=> {togglePlayPause(); playPause();}} className='play-pause'>
                    {isPlaying ? <Pause /> : <Play />}
                </div>

                <div onClick={() => skipTrack(1)} className='next'><SkipForward /></div>
            </div>
        </div>
    </div>
  )
}
