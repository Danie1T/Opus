import React from 'react'
import { useState, useEffect } from 'react'

import ApiManager from '../../helpers/ApiManager/ApiManager'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Devices = () => {
  const [devices, setDevices] = useState([])

  useEffect(() => {
    const getDevices = async () => {
      const allDevices = await ApiManager.getDevices()
      console.log("Fetched devices:", allDevices);
      setDevices(allDevices.devices)
    }

    getDevices()
  }, [])

  return (
    <div>
      <div>Select a device for playback</div>
      {devices.map((device, index) => (
        // <Link key={index} to = "/start" state={device}>
        //   <Typography>{device.name}</Typography>
        // </Link>
        <Button key={index} onClick={() => {localStorage.setItem('device', device.id)}} href="/start">{device.name}</Button>
      ))}
    </div>
  )
}

export default Devices