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
            Suggesting additions to {location.state.selectedPlaylist.name} based on the selected songs:
            {selectedSongs.map((song, index) => (
                <Typography key={index}>{song.track.name}</Typography>
            ))}
            {recommendedSongs && recommendedSongs.length > 0 && songCounter < 98 && (
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
                                    const newCounter = prevCounter + 1
                                    setActiveSong(recommendedSongs[newCounter])
                                    return newCounter
                                })
                            }}>NO</Button>
                            <img
                                src={activeSong.album.images[0].url}
                                alt={activeSong.name}
                                style={{ width: '30%', height: 'auto', borderRadius: 4 }}
                            />
                            <Button variant='contained' onClick={() => { 
                                setSongCounter(prevCounter => {
                                    addSong(activeSong, location.state.selectedPlaylist)
                                    const newCounter = prevCounter + 1
                                    setActiveSong(recommendedSongs[newCounter])
                                    return newCounter
                                })
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