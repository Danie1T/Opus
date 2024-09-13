import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const PlaylistSongCard = ({song, selectedSongs}) => {
    const isSelected = selectedSongs.some(selectedSong => selectedSong.track.id === song.id);

    return (
        <Card sx={{
            height: "3.5vw",
            bgcolor: isSelected ? "#5c5a5a" : "#242424",
            display:"flex",
            p:0.7,
            cursor:"pointer"}}>
            <CardMedia 
                component="img"
                image={song.album.images[0].url}
                sx={{ 
                    width: "3.5vw",
                    height: 'auto'
                }}
                title={song.name}
            />
            <CardContent>
                <Typography color="white">{song.name}</Typography>
            </CardContent>
        </Card>
    )
}

export default PlaylistSongCard