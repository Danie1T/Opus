const CLIENT_ID = "a329475ef4934029979bb3f446b72fd6"
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
const RESPONSE_TYPE = "code"
const SCOPE = ["playlist-read-private", "playlist-modify-public", "playlist-modify-private", "streaming", "user-read-email", "user-read-private", "streaming", "user-read-playback-state"]
const SCOPE_URL = SCOPE.join("%20")

const ENDPOINTS = {
    AUTHORIZATION: () => `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE_URL}`,
    GET_ACCESS_TOKEN: () => `https://accounts.spotify.com/api/token`,
    GET_USER_ID: () => `https://api.spotify.com/v1/me`,
    CREATE_PLAYLIST: (userId) => `https://api.spotify.com/v1/users/${userId}/playlists`,
    GET_PLAYLISTS: (userId, offset) => `https://api.spotify.com/v1/users/${userId}/playlists?limit=50&offset=${offset}`,
    GET_PLAYLIST_SONGS: (playlistId, offset) => `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50&offset=${offset}`,
    GET_RECOMMENDATIONS_FROM_TRACKS: (tracks) => `https://api.spotify.com/v1/recommendations?limit=100&seed_tracks=${tracks}`,
    ADD_TO_PLAYLIST: (playlistId) => `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    GET_DEVICES: () => `https://api.spotify.com/v1/me/player/devices`,
    START_PLAYBACK: (deviceId) => `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    PAUSE_PLAYBACK: (deviceId) => `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`
}

export default ENDPOINTS