import React from 'react'

export default function Tracks() {

  return (
    <div className='track-details'>
        <div>
            <img src={details.cover} alt={details.title} />
        </div>

        <div>
            <h2 className='artist'>{details.artist}</h2>
            <p className='title'>{details.title}</p>
        </div>
    </div>
  )
}
