import React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const CLIENT_ID = "9b0b5000eade409190d6ec8f7b1feb31"
const CLIENT_SECRET = "cf282ff3fa1747679cc9c40310950413"
const REDIRECT_URI = "http://localhost:5173"
const RESPONSE_TYPE = "code"
const SCOPE = ["playlist-modify-private", "streaming", "user-read-email", "user-read-private"]
const SCOPE_URL = SCOPE.join("%20")

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"

/* http://localhost:5173/?code=AQBJFBzKKg8mdxwIjq7yr48vmSaCdP7NJlHG89h3jpNQ5eJbrr0mK97nFzlKQRExZVbqnKHg31ou2TTDA3ZYMO-zSt64o2SM5XjoXXUoZIYYIpKTw5Chpmb-RIlMmuzGBhWwapX-jQ-Hi_naMjjjWAP-NNlWeWLnkukRz8hYjs3xG_WGO0zCBdTT9BS3HDjoiZ-EdGHNmCmYHGJ2Mr4ZVWE4LdDX2TR7G7H0ocwNewoRaju6jpWUGzm-7xysmxoTPg */

export default function Login() {
  const [code, setCode] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [accessTokenLoaded, setAccessTokenLoaded] = useState(false)

  useEffect(() => {
    if (!code) {
      getCodeFromURL()
    }
  }, [])

  useEffect(() => {
    if (code && !accessTokenLoaded) {
      console.log("token")
      console.log(code)
      getAccessToken()
      setAccessToken(accessToken)
      console.log(accessToken)
    }
  }, [code])

  const getCodeFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    setCode(code)
  }

  const accessTokenOptions = {
    method: "POST",
    headers: {
      "Authorization": "Basic " + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI
    })
  };

  const getAccessToken = () => {
    fetch(TOKEN_ENDPOINT, accessTokenOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    
    setAccessTokenLoaded(true)
  }

  return (
    <div className='App'>
      <h1>Opus</h1>
      <h3>Let's Get Started</h3>
    <Button variant="contained" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE_URL}`}>START</Button>
  </div>
  )
}
