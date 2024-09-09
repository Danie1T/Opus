import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Slider } from '@mui/material'

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const CLIENT_ID = "9b0b5000eade409190d6ec8f7b1feb31"
const CLIENT_SECRET = "cf282ff3fa1747679cc9c40310950413"
const REDIRECT_URI = "http://localhost:5173"
const RESPONSE_TYPE = "code"
const SCOPE = ["playlist-read-private", "playlist-modify-public", "playlist-modify-private", "streaming", "user-read-email", "user-read-private"]
const SCOPE_URL = SCOPE.join("%20")

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"
const PLAYLIST_ENDPOINT = "/api/users/me/playlists"
const GET_USER_ENDPOINT = "/api/me"
const GET_RECOMMENDATIONS = "/api/recommendations"

export default function Login() {
  const [code, setCode] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [accessTokenLoaded, setAccessTokenLoaded] = useState(false)
  const [displayPlaylists, setDisplayPlaylists] = useState(false)
  const [offset, setOffset] = useState(0)
  const [playlists, setPlaylists] = useState([])
  const [playlistSelected, setPlaylistSelected] = useState(false)
  const [totalPlaylists, setTotalPlaylists] = useState(0)

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
    }
  }, [code])

  useEffect(() => {
    if (displayPlaylists && accessToken) {
      getPlaylists();
    }
  }, [displayPlaylists, accessToken, offset]);

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
      .then(data => setAccessToken(data.access_token))
      .catch(error => console.error(error));
    setAccessTokenLoaded(true)
  }

  const getUserIdOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }

  const getUserId = async () => {
    let response = await fetch(GET_USER_ENDPOINT, getUserIdOptions)
    let id = (await response.json()).id
    return id
  }

  const createPlaylistOptions = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Opus Playlist",
      public: false,
      description: "Personally curated playlist created with Opus"
    })
  }

  const createPlaylist = async () => {
    let userId = await getUserId();
    console.log(createPlaylistOptions.body)
    fetch(`/api/users/${userId}/playlists`, createPlaylistOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  const getPlaylistOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      // "Content-Type": "application/json",
    }
  }

  const getPlaylists = async () => {
    let userId = await getUserId();
    let response = await fetch(`/api/users/${userId}/playlists?limit=50&offset=${offset}`, getPlaylistOptions)
    const data = await response.json();
    setTotalPlaylists(data.total)
    const ownedPlaylists = await (data.items).filter(playlist => playlist.owner.id == userId)
    console.log(ownedPlaylists)
    setPlaylists(playlists => [...playlists, ...ownedPlaylists] || []);
    console.log(playlists)
  }

  return (
    <div className='App'>
      <div>
      <h1>Opus</h1>
        <h3>Let's Get Started</h3>
        <Button variant="contained" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE_URL}`}>START</Button>
        <Button onClick={() => setDisplayPlaylists(true)}>Use Existing Playlist</Button>
        <Button onClick={createPlaylist}>Create playlist</Button>
      </div>
      <div>
        {displayPlaylists && playlists.length > 0 ? (
          <>
          {playlists.map((playlist, index) => (
            <Link key={index} to = "/songs" state={playlist}>
              <div>{playlist.name}</div>
            </Link>
          ))}
          {offset + 50 < totalPlaylists && (
            <Button onClick={() => setOffset(offset + 50)}>Load More</Button>
          )}
          </>
        ) : (
          <div>No playlists available</div>
        )}

      </div>
    </div>
  )
}
