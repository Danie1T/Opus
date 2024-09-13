import React from 'react'
import { useState, useEffect } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

import ApiManager from '../../../helpers/ApiManager/ApiManager'
import PlaylistSongCard from './PlaylistSongCard'

const PlaylistModal = ({playlist, open, onClose}) => {
    const [playlistSongs, setPlaylistSongs] = useState([])
    const [totalSongs, setTotalSongs] = useState(0)
    const [songOffset, setSongOffset] = useState(0)
    const [selectedSongs, setSelectedSongs] = useState([])
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        const getPlaylistSongs = async () => {
            const playlistId = playlist.id
            const playlistSongsReturn = await ApiManager.getPlaylistSongs(playlistId, songOffset)
            setTotalSongs(playlistSongsReturn.total)
            setPlaylistSongs(playlistSongs => [...playlistSongs, ...playlistSongsReturn.items] || [])
        }
        
        if (open) {
            getPlaylistSongs()
        }
    }, [open, songOffset])

    useEffect(() => {
        console.log("Selected Songs:", selectedSongs);
        if (selectedSongs.length >= 3) {
        setButtonDisabled(false)
        }  else {
        setButtonDisabled(true)
        }
    }, [selectedSongs]);
    
    const handleSongSelected = (song) => {
        if (selectedSongs.includes(song)) {
            setSelectedSongs(selectedSongs => selectedSongs.filter(prevSongs => prevSongs!== song))
        } else {
        if (selectedSongs.length < 5) {
            setSelectedSongs(selectedSongs => [...selectedSongs, song])
        }
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: "65vw",
                height: "80vh",
                border: '2px solid #000',
                boxShadow: 24,
                outline: 'none',
                display: "flex",
                flexDirection: "column"
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#363535",
                    p: 2,
                    flexShrink: 0,
                }}>
                    {playlist.images && playlist.images.length > 0 ? (
                    <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        style={{ width: '10%', height: 'auto', borderRadius: 4 }}
                    />
                    ) : (
                        <img
                            src="src/assets/empty_playlist.png"
                            alt={playlist.name}
                            style={{ width: '10%', height: 'auto', borderRadius: 4 }}
                        />
                    )}
                    <Typography id="modal-modal-title" variant="h4" component="h2" sx={{pl: 3}}>
                        {playlist.name}
                    </Typography>
                </Box>
                
                <Box sx={{
                    overflowY: 'auto'
                }}>
                    {playlistSongs.map((song, index) => (
                        <div key={index} onClick={() => { handleSongSelected(song) }}>
                            <PlaylistSongCard song={song.track} selectedSongs={selectedSongs} />
                        </div>
                    ))}
                    {songOffset + 50 < totalSongs && (
                        <Box sx={{display: "flex", justifyContent: "center", bgcolor: "#242424"}}>
                            <Button onClick={() => setSongOffset(songOffset + 50)}>Load More</Button>
                        </Box>
                    )}
                </Box>
                <Box sx={{display: "flex", justifyContent: "center", p:1, bgcolor: "#363535"}}>
                    {!buttonDisabled ? (
                        <Link to="/songs" state={{ playlist, selectedSongs, playlistSongs }}>
                            <Button
                                variant="contained"
                                sx={{
                                    '&.Mui-disabled': {
                                        backgroundColor: 'gray',
                                        color: 'white',
                                    }
                                }}
                                disabled={buttonDisabled}  // This will always be false in this block
                            >
                                GO!
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{
                                '&.Mui-disabled': {
                                    backgroundColor: 'gray',
                                    color: 'white',
                                }
                            }}
                            disabled={buttonDisabled}
                        >
                            GO!
                        </Button>
                    )}
                </Box>
            </Box>
        </Modal>
    )
}

export default PlaylistModal