import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Slider } from '@mui/material'

import ENDPOINTS from '../../helpers/ApiManager/Endpoints'

export default function NewLogin() {

    return (
        <div className='App'>
            <div>
            <h1>Opus</h1>
            <h3>Let's Get Started</h3>
            <Button variant="contained" href={ENDPOINTS.AUTHORIZATION()}>START</Button>
            </div>
        </div>
    )
}