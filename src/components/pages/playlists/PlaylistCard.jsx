import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Modal, Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import ApiManager from '../../../helpers/ApiManager/ApiManager';

const PlaylistCard = ({playlist, song, index}) => {
    return (
        <div key={index}>
            <Card sx={{ pt:2, pl: 2, pr:2, width: "10vw", bgcolor: "transparent", boxShadow: "none", cursor:"pointer", ':hover': {boxShadow: 20, bgcolor: "#363535"} }}>
                {playlist.images && playlist.images.length > 0 ? (
                    <CardMedia 
                        component="img"
                        image={playlist.images[0].url}
                        sx={{ 
                            width: '100%',
                            height: '100%'
                        }}
                        title={playlist.name}
                    />
                ) : (
                    <CardMedia 
                        component="img"
                        image="src/assets/empty_playlist.png"
                        sx={{ 
                            width: '100%',
                            height: 'auto'
                        }}
                        title={playlist.name}
                    />
                )}
                <CardContent sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    pl: 0,
                    pt: 1,
                    bgcolor: 'transparent'
                }}>
                    <Typography variant="subtitle2" component="div" sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: "white"
                    }}>
                        {playlist.name}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default PlaylistCard