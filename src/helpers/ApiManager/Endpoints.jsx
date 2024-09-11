const CLIENT_ID = "9b0b5000eade409190d6ec8f7b1feb31"
const REDIRECT_URI = "http://localhost:5173/callback"
const RESPONSE_TYPE = "code"
const SCOPE = ["playlist-read-private", "playlist-modify-public", "playlist-modify-private", "streaming", "user-read-email", "user-read-private"]
const SCOPE_URL = SCOPE.join("%20")

const ENDPOINTS = {
    AUTHORIZATION: () => `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE_URL}`,
    GET_ACCESS_TOKEN: () => `https://accounts.spotify.com/api/token`,
    GET_USER_ID: () => `/api/me`,
    CREATE_PLAYLIST: (userId) => `/api/users/${userId}/playlists`,
    GET_PLAYLISTS: (userId, offset) => `/api/users/${userId}/playlists?limit=50&offset=${offset}`,
    GET_PLAYLIST_SONGS: (playlistId, offset) => `/api/playlists/${playlistId}/tracks?limit=50&offset=${offset}`,
    GET_RECOMMENDATIONS_FROM_TRACKS: (tracks) => `/api/recommendations?limit=100&seed_tracks=${tracks}`
}

export default ENDPOINTS