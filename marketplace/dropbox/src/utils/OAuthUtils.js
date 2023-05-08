import { OAUTH_HASH_ALGORITHM } from "../constants.js";

export class OAuthUtils {
    _store = new Map();

    /**
     * Generate OAuth 2.0 PKCE challenge parameters which can be used to sign in a user.
     * @returns Response containing OAuth 2.0 PKCE challenger parameters.
     * name to be decided later
     */
    async generateChallenge() {
        const codeVerifier = getUniqueString(64);
        const codeChallenge = await getCodeChallenge(codeVerifier);

        return {
            codeChallenge,
            codeVerifier
        };
    }

    /**
     * Generate access token which can be used to access the OAuth 2.0 backed services.
     * @param tokenRequest - Payload with the parameters to be used for generating access and refresh tokens.
     */
    async generateAccessToken(tokenRequest) {
        const formData = new FormData();
        formData.append("client_id", tokenRequest.clientId);
        formData.append("grant_type", "authorization_code");
        formData.append("code", tokenRequest.code);
        formData.append("redirect_uri", tokenRequest.redirectUri);
        formData.append("code_verifier", tokenRequest.codeVerifier);

        await saveTokenResponse(
            this._store,
            tokenRequest.id,
            tokenRequest.clientId,
            formData,
            tokenRequest.tokenUrl
        );
    }

    /**
     * Get the generated access token to be used for accessing the OAuth 2.0 backed services.
     * The access token returned is always valid (i.e. not expired).
     * Upon expiration of the current access token, the refresh token is used to generate a new access token.
     * @param id - A unique value associated with each authentication request.
     * @returns Access token as a string.
     */
    async getAccessToken(id) {
        const tokenResponseString = this._store.get(id);
        if (!tokenResponseString) {
            throw new Error(`No token has been generated for request id: ${id}.`);
        }

        const tokenResponse = JSON.parse(tokenResponseString);
        if (!tokenResponse) {
            throw new Error(`Invalid token object found for request id: ${id}.`);
        }

        const currentTime = Date.now();
        if (currentTime < tokenResponse.expiry) {
            return tokenResponse.accessToken;
        }

        const formData = new FormData();
        formData.append("client_id", tokenResponse.clientId);
        formData.append("grant_type", "refresh_token");
        formData.append("refresh_token", tokenResponse.refreshToken);

        const { accessToken } = await saveTokenResponse(
            this._store,
            id,
            tokenResponse.clientId,
            formData,
            tokenResponse.tokenUrl
        );

        return accessToken;
    }
}

function getUniqueString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

async function getCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const encodedCodeVerifier = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest(OAUTH_HASH_ALGORITHM, encodedCodeVerifier);

    return base64UrlEncode(digest);
}

function base64UrlEncode(digest) {
    let result = "";
    const bytes = new Uint8Array(digest);
    for (var i = 0; i < bytes.byteLength; i++) {
        result += String.fromCharCode(bytes[i]);
    }

    return btoa(result).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function saveTokenResponse(store, id, clientId, formData, tokenUrl) {
    const options = {
        method: "POST",
        body: formData
    };

    const response = await fetch(tokenUrl, options);
    if (!response.ok) {
        throw new Error(`Failed to get the access token for request id: ${id}.`);
    }

    const data = await response.json();
    const tokenResponse = {
        clientId,
        tokenUrl,
        accessToken: data.access_token,
        refreshToken: data.refresh_token ?? formData.get("refresh_token"),
        // Keep a buffer of additional 60 seconds
        expiry: Date.now() + (data.expires_in - 60) * 1000
    };

    store.set(id, JSON.stringify(tokenResponse));
    return tokenResponse;
}
