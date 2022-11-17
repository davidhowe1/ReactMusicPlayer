import React from 'react'

export default function Song ({currentSong}) {
  return (
    <div className='song-container'>
        <div className='album-art'>
            <img src={currentSong.cover} />
        </div>

        <div className='current-song'>
            <h2 className='artist'>{currentSong.artist}</h2>
            <p className='track-title'>{currentSong.title}</p>
        </div>
    </div>
  )
}
