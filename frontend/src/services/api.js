import axios from "axios";
import authServices from "./auth";

export const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 1000,
});

api.interceptors.request.use(config => {
    const accessToken = authServices.getAccessToken();
    if (accessToken) {
        config.headers.authorization = `${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    const originalRequest = error.config;
    const loginUrl = `http://localhost:3000/auth/login`;
    const refreshTokenUrl = "/auth/refreshToken";
    if (error.response?.status === 401 && originalRequest.url !== refreshTokenUrl && error.request.responseURL !== loginUrl) {
        await authServices.refreshToken();
        return api(originalRequest);
    }
    return Promise.reject(error);
});