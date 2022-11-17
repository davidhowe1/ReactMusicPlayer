import './App.css';
import { useRef, useState } from 'react';
import { musicData } from '/Users/David/Code and Programming/Apps/music-player/src/data/musicData.js';
import { Disc, Play } from 'react-feather';
import MusicPlayer from './components/MusicPlayer';
import Library from './components/Library';
import { X } from 'react-feather';
import Song from './components/Song';
import { Music } from 'react-feather';

function App() {

  const [tracks, setTracks] = useState(musicData)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(musicData[0])
  const [background, setBackground] = useState(musicData[0])

  const audioElement = useRef(null)

  const [menu, toggleMenu] = useState(false)
  const showMenu = () => toggleMenu(true)
  const hideMenu = () => toggleMenu(false)

  const onPlaying = () => {
    const duration = audioElement.current.duration;
    const currentTime = audioElement.current.currentTime;
    setCurrentSong({...currentSong, progress: currentTime / duration * 100,
     length: duration, currentTime: currentTime})
  }

  const autoPlay = () => {
    if (isPlaying) {
      audioElement.current.play()
    }
  }

  return (

    <div className='App' 
    style={{background: `linear-gradient(45deg, ${background.color1} 0%, ${background.color2} 100%)`, 
    transition: `1s`}}>

      <div className={menu ? 'library-container active' : 'library-container'}>
        <div className='close-menu'>
          <h1>Tracks</h1>
          <X onClick={hideMenu} />
        </div>

        <Library 
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          autoPlay={autoPlay}
          audioElement={audioElement}
          setBackground={setBackground}
          hideMenu={hideMenu}
        />
      </div>

      <div className='header'>
        <h1><Music /><Play/></h1>
          
        <div onClick={showMenu} className='menu'>
            <h1>MENU</h1>
            <Disc />
        </div>  
      </div>

      <div>
            <audio ref={audioElement} src={currentSong.URL} 
            onTimeUpdate={onPlaying}
            onLoadedMetadata={onPlaying}
            onLoadedData={autoPlay}
            />

            <Song 
            currentSong={currentSong}
            />

            <MusicPlayer tracks={tracks} setTracks={setTracks} isPlaying={isPlaying}
            setIsPlaying={setIsPlaying} currentSong={currentSong} 
            setCurrentSong={setCurrentSong} audioElement={audioElement}
            setBackground={setBackground}
             />
      </div>

    </div>
  );
}

export default App;
