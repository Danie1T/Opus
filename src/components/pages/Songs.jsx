import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import ApiManager from '../../helpers/ApiManager/ApiManager'

const Songs = () => {
    const [recommendedSongs, setRecommendedSongs] = useState([])
    const [songCounter, setSongCounter] = useState(0)

    const location = useLocation()
    const selectedSongs = location.state

    useEffect (() => {
        const getRecommendations = async () => {
            const formattedTracks = selectedSongs.map(song => song.track.id)
            const recommendedSongsReturn = await ApiManager.getRecommendationsFromTracks(formattedTracks)
            setRecommendedSongs(recommendedSongsReturn)
        }

        getRecommendations()
    }, [])

    return (
        <div>
            Suggesting based on the selected songs:
            {selectedSongs.map((song, index) => (
                <Typography key={index}>{song.track.name}</Typography>
            ))}
            {recommendedSongs && recommendedSongs.tracks && recommendedSongs.tracks.length > 0 && songCounter < 98 && (
                <div>
                    {console.log(recommendedSongs)}
                    <div>{recommendedSongs.tracks[songCounter].name}</div>
                    <Button onClick={() => setSongCounter(songCounter + 1)}>Next</Button>
                </div>
            )}
        </div>
    )
}

export default Songs