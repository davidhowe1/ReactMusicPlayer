import React, { useState } from 'react'
import { Play } from 'react-feather';
import { musicData } from '/Users/David/Code and Programming/Apps/music-player/src/data/musicData.js';
export default function Library({setCurrentSong, setBackground, hideMenu}) {

const music = musicData;

  return (
    music.map((music => (

        <div onClick={() => {setCurrentSong(music); setBackground(music); hideMenu()}} className="track-details" key={music.id}>
            <div className='album-cover'>
                <img src={music.cover} alt={music.title} />
            </div>

            <div className='track-description'>
                <h2 className='artist'>{music.artist}</h2>
                <p className='title'>{music.title}</p>
            </div>
        </div>
    )))
  )

}

