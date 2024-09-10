import ENDPOINTS from "./Endpoints";
import ApiMethods from "./ApiMethods";

class ApiManager {
    static getUserId = async () => {
        const url = ENDPOINTS.GET_USER_ID()
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
}

export default ApiManager