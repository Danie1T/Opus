import ENDPOINTS from "./Endpoints";
import ApiMethods from "./ApiMethods";

class ApiManager {
    static getUserId = async () => {
        const url = ENDPOINTS.GET_USER_ID()
        console.log(url)
        const idObject = await ApiMethods.get(url)
        return idObject.id
    }

    static createPlaylist = (userId, data) => {
        const url = ENDPOINTS.CREATE_PLAYLIST(userId)
        return ApiMethods.post(url, data)
    }

    static getPlaylists = (userId, offset) => {
        const url = ENDPOINTS.GET_PLAYLISTS(userId, offset)
        return ApiMethods.get(url)
    }

    static getPlaylistSongs = (playlistId, offset) => {
        const url = ENDPOINTS.GET_PLAYLIST_SONGS(playlistId, offset)
        return ApiMethods.get(url)
    }

    static getRecommendationsFromTracks = (tracks) => {
        const url = ENDPOINTS.GET_RECOMMENDATIONS_FROM_TRACKS(tracks)
        return ApiMethods.get(url)
    }

    static addTrackToPlaylist = (playlistId, data) => {
        const url = ENDPOINTS.ADD_TO_PLAYLIST(playlistId)
        return ApiMethods.post(url, data)
    }

    static getDevices = () => {
        const url = ENDPOINTS.GET_DEVICES()
        return ApiMethods.get(url)
    }

    static startPlayback = (deviceId, data) => {
        const url = ENDPOINTS.START_PLAYBACK(deviceId)
        return ApiMethods.put(url, data)
    }

    static pausePlayback = (deviceId) => {
        const url = ENDPOINTS.PAUSE_PLAYBACK(deviceId)
        return ApiMethods.put(url, {})
    }
}

export default ApiManager