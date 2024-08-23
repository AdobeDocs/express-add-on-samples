export const OAUTH_HASH_ALGORITHM = "SHA-256";

export const OAUTH_AUTHORIZATION_URL = "https://ims-na1.adobelogin.com/ims/authorize/v2";

export const OAUTH_CLIENT_ID = "";
// ToDo: Use a different client id for production.
// Also check if `process.env.NODE_ENV` environment variable can be used to set this constant during build.
// export const OAUTH_CLIENT_ID = "<client-id-configured-with-production-redirect-uri>";

export const OAUTH_REDIRECT_URI = "https://localhost:5241/sign-in-using-ims/authorized.html";
// ToDo: Use the below URI for production.
// Also check if `process.env.NODE_ENV` environment variable can be used to set this constant during build.
// export const OAUTH_REDIRECT_URI = "https://<add-on-sub-domain>.wxp.adobe-addons.com/<distribution-package-path>/authorized.html";

export const OAUTH_RESPONSE_TYPE = "code";
export const OAUTH_SCOPE = "openid email";
export const OAUTH_TOKEN_URL = "https://ims-na1.adobelogin.com/ims/token/v3";

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
