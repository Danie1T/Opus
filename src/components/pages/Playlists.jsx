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

  const handleOpen = (index) => setOpenIndex(index);
  const handleClose = () => {
    setOpenIndex(null)
    setSelectedPlaylist(null)
    setPlaylistSongs([])
    setTotalSongs(0)
  }

  useEffect(() => {
    const getPlaylists = async () => {
      const userId = await ApiManager.getUserId()
      const playlistsReturn = await ApiManager.getPlaylists(userId, playlistOffset)
      setTotalPlaylists(playlistsReturn.total)
      const ownedPlaylists = await (playlistsReturn.items).filter(playlist => playlist.owner.id === userId)
      setPlaylists(playlists => [...playlists, ...ownedPlaylists] || [])
    }

    getPlaylists()
  }, [playlistOffset])

  useEffect(() => {
    const getPlaylistSongs = async () => {
      const playlistId = selectedPlaylist.id
      const playlistSongsReturn = await ApiManager.getPlaylistSongs(playlistId, songOffset)
      setTotalSongs(playlistSongsReturn.total)
      setPlaylistSongs(playlistSongs => [...playlistSongs, ...playlistSongsReturn.items] || [])
      console.log(playlistSongs)
    }

    if (selectedPlaylist) {
      getPlaylistSongs()
    }
  }, [selectedPlaylist, songOffset])

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
                      bottom: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: "60vw",
                      height: "60vh",
                      border: '2px solid #000',
                      boxShadow: 24,
                      p: 4,
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
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Modal content
                    </Typography>
                    {playlistSongs.map((song, index) => (
                      <div>{song.track.name}</div>
                    ))}
                    {songOffset + 50 < totalSongs && (
                      <Button onClick={() => setSongOffset(playlistOffset + 50)}>Load More</Button>
                    )}
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