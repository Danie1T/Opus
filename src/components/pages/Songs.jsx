import React from 'react'
import { useLocation } from 'react-router-dom'

const Songs = () => {
    const location = useLocation()
    const playlist = location.state

    return (
        <div>{playlist.name}</div>
    )
}

export default Songs