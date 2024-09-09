import ENDPOINTS from "./Endpoints";
import ApiMethods from "./ApiMethods";

class ApiManager {
    static getUserId = () => {
        const url = ENDPOINTS.GET_USER_ID()
        return ApiMethods.get(url)
    }

    static createPlaylist = (userId, data) => {
        const url = ENDPOINTS.CREATE_PLAYLIST(userId)
        return ApiMethods.post(url, data)
    }

    static getPlaylists = (userId, offset) => {
        const url = ENDPOINTS.GET_PLAYLISTS(userId, offset)
        return ApiMethods.get(url)
    }
}