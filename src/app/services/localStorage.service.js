const TOKEN_KEY = 'jwt-token';
const REFRESH_TOKEN = 'jwt-refresh-token';
const EXPIRES_DATE = 'jwt-expires';
const USERID_KEY = 'user-local-id';

export const setTokens = ({ refreshToken, idToken, localId, expiresIn = 3600 }) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000;

    localStorage.setItem(TOKEN_KEY, idToken)
    localStorage.setItem(USERID_KEY, localId)
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(EXPIRES_DATE, expiresDate);
}

export const getAccessToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN);
}

export const getExpires = () => {
    return localStorage.getItem(EXPIRES_DATE);
}

export const getUserId = () => {
    return localStorage.getItem(USERID_KEY);
}

const localStorageService = { setTokens, getAccessToken, getRefreshToken, getExpires, getUserId };

export default localStorageService;