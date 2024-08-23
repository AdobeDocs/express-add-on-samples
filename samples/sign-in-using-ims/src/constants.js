// Add-on package created from running `npm run package`
// has `process.env.NODE_ENV` set to `production`.
// While package created from running `npm run build/start`
// does not set `process.env.NODE_ENV`.
export const IS_ENV_PRODUCTION = process.env.NODE_ENV === "production";

export const OAUTH_HASH_ALGORITHM = "SHA-256";

export const OAUTH_AUTHORIZATION_URL = "https://ims-na1.adobelogin.com/ims/authorize/v3";

// Use different Client Ids for development and production.
export const OAUTH_CLIENT_ID = IS_ENV_PRODUCTION ? "<production-ims-client-id>" : "<development-ims-client-id>";

// Use different Redirect URIs for development and production.
export const OAUTH_REDIRECT_URI = IS_ENV_PRODUCTION
    ? "https://<production-redirect-uri>"
    : "https://<development-redirect-uri>";

export const OAUTH_RESPONSE_TYPE = "code";
export const OAUTH_SCOPE = "openid email";
export const OAUTH_TOKEN_URL = "https://ims-na1.adobelogin.com/ims/token/v4";

// ToDo: Generate the state variable per request instead.
// Every authorization request must have a unique state.
export const OAUTH_AUTHORIZATION_STATE = "sign-in-using-ims-state";

// ToDo: Generate these challenge variables per request instead.
// Every authorization request must have a unique challenge.
export const OAUTH_CODE_CHALLENGE = "lZnVSh4zPARBlCZQMrvkbUjDeveTBH-d5JqFU_JOTlM";
export const OAUTH_CODE_VERIFIER = "oISg7xrEhuEXsKI1FbwSDrpiTSbGVSqmo1E3YDDF1Ko";
export const OAUTH_CODE_CHALLENGE_METHOD = "S256";

export const OAUTH_WINDOW_MIN_WIDTH = 480;
export const OAUTH_WINDOW_MAX_WIDTH = 800;

export const OAUTH_WINDOW_MIN_HEIGHT = 480;

export const USER_PROFILE_API_URL = "https://ims-na1.adobelogin.com/ims/profile";

export const CANNOT_GET_USER_FROM_LOCAL_ADD_ON =
    "Cannot get user information from IMS from locally hosted add-on. Please try with private link.";
