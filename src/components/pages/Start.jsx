import React from 'react'
import Devices from './Devices'

import { Button, Stack } from '@mui/material'

const Start = () => {
  return (
    <div>
      <h2>Let's find some new music</h2>
      <p>What recommendations are you looking for?</p>
      <Stack direction="row" justifyContent="center" spacing={3}>
        <Button variant="contained" color="primary" sx={{ width: "210px" }}>
          Create New Playlist
        </Button>
        <Button variant="contained" color="primary" sx={{ width: "210px" }} href="/playlists">
          Use Existing Playlist
        </Button>
    </Stack>
    </div>
  )
}

export default Start