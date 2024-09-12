import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Box, Typography, Modal, Button } from '@mui/material'
import ApiManager from '../../helpers/ApiManager/ApiManager'

const Songs = () => {
  const [playlists, setPlaylists] = useState([])
  const [totalPlaylists, setTotalPlaylists] = useState(0)
  const [playlistOffset, setPlaylistOffset] = useState(0)
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [playlistSongs, setPlaylistSongs] = useState([])
  const [totalSongs, setTotalSongs] = useState(0)
  const [songOffset, setSongOffset] = useState(0)
  const [selectedSongs, setSelectedSongs] = useState([])
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)

  const handleOpen = (index) => setOpenIndex(index);
  const handleClose = () => {
    setOpenIndex(null)
    setSelectedPlaylist(null)
    setPlaylistSongs([])
    setTotalSongs(0)
    setSelectedSongs([])
  }

  useEffect(() => {
    const getPlaylists = async () => {
      const userId = await ApiManager.getUserId()
      const playlistsReturn = await ApiManager.getPlaylists(userId, playlistOffset)
      setTotalPlaylists(playlistsReturn.total)
      const ownedPlaylists = await (playlistsReturn.items).filter(playlist => playlist.owner.id === userId)
      setPlaylists(playlists => [...playlists, ...ownedPlaylists] || [])
    }

    const getDevices = async () => {
      const allDevices = await ApiManager.getDevices()
      console.log("Fetched devices:", allDevices);
      setDevices(allDevices)
    }

    getPlaylists()
    getDevices()
  }, [playlistOffset])

  useEffect(() => {
    const getPlaylistSongs = async () => {
      const playlistId = selectedPlaylist.id
      const playlistSongsReturn = await ApiManager.getPlaylistSongs(playlistId, songOffset)
      setTotalSongs(playlistSongsReturn.total)
      setPlaylistSongs(playlistSongs => [...playlistSongs, ...playlistSongsReturn.items] || [])
    }

    if (selectedPlaylist) {
      getPlaylistSongs()
    }
  }, [selectedPlaylist, songOffset])

  useEffect(() => {
    console.log("Selected Songs:", selectedSongs);
    if (selectedSongs.length >= 3) {
      setButtonDisabled(false)
    }  else {
      setButtonDisabled(true)
    }
  }, [selectedSongs]);

  useEffect(() => {
    if (Array.isArray(devices.devices) && devices.devices.length > 0) {
      setSelectedDevice(devices.devices[0]);
    }
  }, [devices])

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
    <div>
      <h2>Your Playlists</h2>
      {playlists.length > 0 ? (
          <>
          {playlists.map((playlist, index) => (
            // <Link key={index} to = "/songs" state={playlist}>
            //   <div>{playlist.name}</div>
            // </Link> 
            <div key={index}>
              <Button onClick={() => { setSelectedPlaylist(playlist), handleOpen(index), setSongOffset(0) }} size="small">
                {playlist.name}
              </Button>
              <Modal
                  open={openIndex === index}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  style={{overflowY:"scroll"}}
                >
                  <Box sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: "60vw",
                      height: "60vh",
                      border: '2px solid #000',
                      boxShadow: 24,
                      p: 4,
                      overflowY: 'auto'
                  }}>
                    {playlist.images && playlist.images.length > 0 ? (
                      <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        style={{ width: '10%', height: 'auto', borderRadius: 4 }}
                      />
                    ) : (
                        <Typography>No image available</Typography>
                    )}
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      {playlist.name}
                    </Typography>
                    {playlistSongs.map((song, index) => (
                      <Typography key={index} style={{cursor:'pointer'}} onClick={() => { handleSongSelected(song) }}>{song.track.name}</Typography>
                    ))}
                    {songOffset + 50 < totalSongs && (
                      <Button onClick={() => setSongOffset(songOffset + 50)}>Load More</Button>
                    )}
                    <Link key={index} to = "/songs" state={{selectedPlaylist, selectedSongs, selectedDevice}}>
                      <Button
                        variant="contained"
                        sx={{
                          '&.Mui-disabled': { 
                            backgroundColor: 'gray',
                            color: 'white',
                          },
                        }}
                        disabled={buttonDisabled}
                      >
                        GO!
                      </Button>
                    </Link>
                  </Box>
                </Modal>
            </div>
          ))}
          {playlistOffset + 50 < totalPlaylists && (
            <Button onClick={() => setPlaylistOffset(playlistOffset + 50)}>Load More</Button>
          )}
          </>
        ) : (
          <div>No playlists available</div>
        )}
    </div>
    
  )
}

export default Songs