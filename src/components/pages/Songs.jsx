import React, { act, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Typography, Box } from '@mui/material'
import ApiManager from '../../helpers/ApiManager/ApiManager'

const Songs = () => {
    const navigate = useNavigate();

    const [recommendedSongs, setRecommendedSongs] = useState([])
    const [songCounter, setSongCounter] = useState(0)
    const [activeSong, setActiveSong] = useState(null)

    const location = useLocation()
    const selectedSongs = location.state.selectedSongs

    console.log(recommendedSongs)
    console.log(songCounter)

    const addSong = async (track, playlist) => {
        const trackUri = track.uri
        const playlistId = playlist.id 
        await ApiManager.addTrackToPlaylist(playlistId, {"uris": [trackUri]})
    }

    const exitSongs = async () => {
        await ApiManager.pausePlayback(location.state.selectedDevice.id)
        navigate("/playlists")
    }

    useEffect (() => {
        const getRecommendations = async () => {
            const formattedTracks = selectedSongs.map(song => song.track.id)
            const recommendedSongsReturn = await ApiManager.getRecommendationsFromTracks(formattedTracks)
            setRecommendedSongs(recommendedSongsReturn)
            if (recommendedSongsReturn.tracks && recommendedSongsReturn.tracks.length > 0) {
                setActiveSong(recommendedSongsReturn.tracks[0])
            }
        }
        getRecommendations()
    }, [selectedSongs])

    useEffect(() => {
        console.log(location.state)
        if (activeSong && activeSong.uri) {
            ApiManager.startPlayback(location.state.selectedDevice.id, {
                "uris": [activeSong.uri],
                "position_ms": 30000
            })
        }
    }, [activeSong])

    return (
        <div>
            Suggesting based on the selected songs:
            {selectedSongs.map((song, index) => (
                <Typography key={index}>{song.track.name}</Typography>
            ))}
            {recommendedSongs && recommendedSongs.tracks && recommendedSongs.tracks.length > 0 && songCounter < 98 && (
                <div>
                    <Box sx={{
                      top: '50%',
                      left: '50%',
                      width: "60vw",
                      height: "60vh",
                      display:"flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column"
                    }}>
                        <Box sx={{
                            display:"flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <Button variant='contained' onClick={() => {
                                setSongCounter(prevCounter => {
                                    const newCounter = prevCounter + 1;
                                    setActiveSong(recommendedSongs.tracks[newCounter]);
                                    return newCounter;
                                });
                            }}>NO</Button>
                            <img
                                src={activeSong.album.images[0].url}
                                alt={activeSong.name}
                                style={{ width: '30%', height: 'auto', borderRadius: 4 }}
                            />
                            <Button variant='contained' onClick={() => { 
                                addSong(activeSong, location.state.selectedPlaylist), setSongCounter(songCounter + 1), setActiveSong(recommendedSongs.tracks[songCounter]) 
                            }}>YES</Button>
                        </Box>
                        {activeSong.name}
                    </Box>
                    <Button onClick={() => exitSongs()} >Done</Button>
                </div>
            )}
        </div>
    )
}

export default Songs