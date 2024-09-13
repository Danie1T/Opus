import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Box, Typography, Modal, Button } from '@mui/material'
import Grid from '@mui/material/Grid2';
import ApiManager from '../../../helpers/ApiManager/ApiManager'
import PlaylistCard from './PlaylistCard'
import PlaylistModal from './PlaylistModal'

const Playlists = () => {
  const [playlists, setPlaylists] = useState([])
  const [totalPlaylists, setTotalPlaylists] = useState(0)
  const [playlistOffset, setPlaylistOffset] = useState(0)
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getPlaylists = async () => {
      const userId = await ApiManager.getUserId()
      const playlistsReturn = await ApiManager.getPlaylists(userId, playlistOffset)
      console.log(playlistsReturn)
      setTotalPlaylists(playlistsReturn.total)
      const ownedPlaylists = await (playlistsReturn.items).filter(playlist => playlist.owner.id === userId)
      setPlaylists(playlists => [...playlists, ...ownedPlaylists] || [])
    }

    getPlaylists()
  }, [playlistOffset])

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
    handleOpenModal(playlist);
  };

  const handleOpenModal = (playlist) => {
    setSelectedPlaylist(playlist)
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setSelectedPlaylist(null)
    setOpenModal(false)
  }

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <h2>Your Playlists</h2>
      {playlists.length > 0 ? (
          <>
          <Grid
            container
            rowSpacing={2}
            sx={{
              width: "75vw",
              display:"flex",  
              alignItems: "center",
            }}
          >
            {playlists.map((playlist, index) => (
              <Grid size={2} key={index} onClick={() => handlePlaylistClick(playlist)}>
                <PlaylistCard playlist={playlist} index={index}/>
              </Grid>
            ))}
          </Grid>
          {playlistOffset + 50 < totalPlaylists && (
              <Button onClick={() => setPlaylistOffset(playlistOffset + 50)}>Load More</Button>
          )}
          </>
        ) : (
          <div>No playlists available</div>
        )}

        {selectedPlaylist && (
          <PlaylistModal playlist={selectedPlaylist} open={openModal} onClose={handleCloseModal} />
        )}
    </div>
  )
}

export default Playlists