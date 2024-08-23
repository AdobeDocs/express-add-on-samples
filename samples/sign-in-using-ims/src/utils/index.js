import {
    OAUTH_AUTHORIZATION_STATE,
    OAUTH_AUTHORIZATION_URL,
    OAUTH_CLIENT_ID,
    OAUTH_CODE_CHALLENGE,
    OAUTH_CODE_CHALLENGE_METHOD,
    OAUTH_REDIRECT_URI,
    OAUTH_RESPONSE_TYPE,
    OAUTH_SCOPE,
    OAUTH_WINDOW_MAX_WIDTH,
    OAUTH_WINDOW_MIN_HEIGHT,
    OAUTH_WINDOW_MIN_WIDTH,
} from "../constants";

export function getSignInUrl() {
    const signInUrl = new URL(OAUTH_AUTHORIZATION_URL);
    signInUrl.searchParams.append("client_id", OAUTH_CLIENT_ID);
    signInUrl.searchParams.append("scope", OAUTH_SCOPE);
    signInUrl.searchParams.append("redirect_uri", OAUTH_REDIRECT_URI);
    signInUrl.searchParams.append("state", OAUTH_AUTHORIZATION_STATE);
    signInUrl.searchParams.append("response_type", OAUTH_RESPONSE_TYPE);
    signInUrl.searchParams.append("code_challenge", OAUTH_CODE_CHALLENGE);
    signInUrl.searchParams.append("code_challenge_method", OAUTH_CODE_CHALLENGE_METHOD);

    return signInUrl.href;
}

export function getWindowOptions(windowSize) {
    const windowOuterWidth = window.outerWidth;
    const windowOuterHeight = window.outerHeight;

    // Set the window width to default, when:
    // 1. The provided window width is either undefined, or
    // 2. The provided window width is not in the valid range.
    let windowWidth = OAUTH_WINDOW_MIN_WIDTH;
    if (
        windowSize?.width !== undefined &&
        windowSize.width >= OAUTH_WINDOW_MIN_WIDTH &&
        windowSize.width <= OAUTH_WINDOW_MAX_WIDTH
    ) {
        windowWidth = windowSize.width;
    }

    // Set the window height to default, when:
    // 1. The provided window height is either undefined, or
    // 2. The provided window height is not in the valid range.
    let windowHeight = OAUTH_WINDOW_MIN_HEIGHT;
    if (
        windowSize?.height !== undefined &&
        windowSize.height >= OAUTH_WINDOW_MIN_HEIGHT &&
        windowSize.height <= windowOuterHeight
    ) {
        windowHeight = windowSize.height;
    }

    // Position the window in the center of the window.
    const left = (windowOuterWidth - windowWidth) / 2;
    const top = (windowOuterHeight - windowHeight) / 2;

    return `left=${left},top=${top},width=${windowWidth},height=${windowHeight}`;
}
