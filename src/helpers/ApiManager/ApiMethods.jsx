import ENDPOINTS from "./Endpoints";

const CLIENT_ID = "9b0b5000eade409190d6ec8f7b1feb31"
const CLIENT_SECRET = "cf282ff3fa1747679cc9c40310950413"

const getHeaders = (accessTokenRequired, accessToken=null) => {
    if (accessTokenRequired) {
        return {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    } else {
        return {
            "Authorization": "Basic " + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
}

class ApiMethods {
    static accessToken = localStorage.getItem('accessToken');

    static getCodeFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get('code')
    }

    static async getAccessToken() {
        const code = this.getCodeFromURL()
        try {
            const response = await fetch(ENDPOINTS.GET_ACCESS_TOKEN(), {
                method: "POST",
                headers: getHeaders(false),
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: import.meta.env.VITE_REDIRECT_URI
                })
            })

        if (response.status === 200) {
            const data = await response.json();
            this.accessToken = data.access_token;
            localStorage.setItem('accessToken', this.accessToken);
            return this.accessToken;
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    }
    catch (error) {
        console.error("Error while fetching access token:", error);
        throw error;
    }
}

    static async apiRequest(method, url, body={}, accessTokenRequired=true) {
        try {
            if (accessTokenRequired && !this.accessToken) {
                await this.getAccessToken()
            }
            const response = await fetch(url, {method, headers: getHeaders(accessTokenRequired, this.accessToken), body: method !== 'GET' ? JSON.stringify(body) : undefined })
            console.log(response)

            if (response.status === 200 || response.status === 201) {
                if (method === "PUT") {
                    return {}
                } else {
                    return await response.json()
                }
            } else if (response.status === 204) {
                return
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error("Error while making API request:", error);
            throw error;
        }
    }

    static get(url) {
        return this.apiRequest('GET', url)
    }

    static post(url, data) {
        return this.apiRequest('POST', url, data)
    }

    static put(url, data) {
        return this.apiRequest('PUT', url, data)
    }
}

export default ApiMethods