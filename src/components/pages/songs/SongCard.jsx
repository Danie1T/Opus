import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const SongCard = ( {activeSong, playlist} ) => {
  return (
    <Card sx={{display: "flex", flexDirection: "column", backgroundColor: 'transparent', boxShadow: "none", width: "25vw", height: "100%", textAlign: 'center', justifyContent: "center"}}>
        <CardMedia 
            component="img"
            image={activeSong.album.images[0].url}
            sx={{ 
                width: '25vw',
                height: 'auto'
            }}
        />
        <CardContent>
            <Typography variant="h5" color="white" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '100%'}}>{activeSong.name}</Typography>
            <Typography variant="subtitle1" color="white" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '100%'}}>{activeSong.artists.map(artist => artist.name).join(', ')}</Typography>
        </CardContent>
    </Card>
  )
}

export default SongCard