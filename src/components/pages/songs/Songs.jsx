import React, { act, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Typography, Box, Fab } from '@mui/material'
import { Check, Clear } from '@mui/icons-material'
import ApiManager from '../../../helpers/ApiManager/ApiManager'

import SongCard from './SongCard'

const Songs = () => {
    const navigate = useNavigate();

    const [recommendedSongs, setRecommendedSongs] = useState([])
    const [songCounter, setSongCounter] = useState(0)
    const [activeSong, setActiveSong] = useState(null)

    const location = useLocation()
    const selectedSongs = location.state.selectedSongs
    const device = localStorage.getItem("device")

    console.log(recommendedSongs)
    console.log(songCounter)

    const addSong = async (track, playlist) => {
        const trackUri = track.uri
        const playlistId = playlist.id 
        await ApiManager.addTrackToPlaylist(playlistId, {"uris": [trackUri]})
    }

    const exitSongs = async () => {
        await ApiManager.pausePlayback(device)
        navigate("/playlists")
    }

    useEffect (() => {
        const getRecommendations = async () => {
            const formattedTracks = selectedSongs.map(song => song.track.id)
            const recommendedSongsReturn = await ApiManager.getRecommendationsFromTracks(formattedTracks)
            const playlistTracks = location.state.playlistSongs.flatMap(addedSong => addedSong.track.id);
            const filteredRecommendedSongsReturn = recommendedSongsReturn.tracks.filter(song => !playlistTracks.includes(song.id))
            console.log(filteredRecommendedSongsReturn)
            setRecommendedSongs(filteredRecommendedSongsReturn)
            if (filteredRecommendedSongsReturn && filteredRecommendedSongsReturn.length > 0) {
                console.log(filteredRecommendedSongsReturn)
                setActiveSong(filteredRecommendedSongsReturn[0])
            }
        }
        getRecommendations()
    }, [selectedSongs])

    useEffect(() => {
        console.log(location.state)
        if (activeSong && activeSong.uri) {
            ApiManager.startPlayback(device, {
                "uris": [activeSong.uri],
                "position_ms": 30000
            })
        }
    }, [activeSong])

    return (
        <div>
            <Typography>Suggesting additions to {location.state.playlist.name} based on the selected songs:</Typography>
            {selectedSongs.map((song, index) => (
                <Typography key={index}>{song.track.name}</Typography>
            ))}
            {recommendedSongs && recommendedSongs.length > 0 && songCounter < 98 && (
                <div>
                        <Box sx={{
                            display:"flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            pt: 5,
                            width: "65vw" 
                        }}>
                            <Fab variant='contained' sx={{width: "12vw", height:"12vw", bgcolor:"#d42020", ':hover': {boxShadow: 20, bgcolor: "#e36d6d"}}} onClick={() => {
                                setSongCounter(prevCounter => {
                                    const newCounter = prevCounter + 1
                                    setActiveSong(recommendedSongs[newCounter])
                                    return newCounter
                                })
                            }}>
                                <Clear fontSize='large'/>
                            </Fab>
                            <SongCard activeSong={activeSong} playlist={location.state.selectedPlaylist}/>
                            <Fab variant='contained' sx={{width: "12vw", height:"12vw", bgcolor:"#12db12", ':hover': {boxShadow: 20, bgcolor: "#70cf70"}}} onClick={() => { 
                                setSongCounter(prevCounter => {
                                    addSong(activeSong, location.state.playlist)
                                    const newCounter = prevCounter + 1
                                    setActiveSong(recommendedSongs[newCounter])
                                    return newCounter
                                })
                            }}>
                                <Check fontSize='large'/>
                            </Fab>
                        </Box>
                        <Button variant="contained" onClick={() => exitSongs()} >Done</Button>
                </div>
            )}
        </div>
    )
}

export default Songs