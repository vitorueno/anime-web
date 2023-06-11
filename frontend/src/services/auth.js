import jwtDecode from "jwt-decode";
import { api } from "./api";

function saveTokens(accessToken, refreshToken) {
    localStorage.setItem("access-token", accessToken);
    localStorage.setItem("refresh-token", refreshToken);
}

function getAccessToken() {
    return localStorage.getItem("access-token");
}

function getRefreshToken() {
    return localStorage.getItem("refresh-token");
}

function getIdFromAccessToken(accessToken) {
    try {
        const { id } = jwtDecode(accessToken);

        return id;
    } catch (err) {
        console.log(err);
        return;
    }
}

function getRoleFromAccessToken(accessToken) {
    try {
        const { admin } = jwtDecode(accessToken);

        return admin;
    } catch (err) {
        console.log(err);
        return;
    }
}


async function signIn(credential, password) {
    try {
        const res = await api.post("/auth/login", { credential, password });
        saveTokens(res.data.accessToken, res.data.refreshToken);
        return res.status
    } catch (err) {
        console.log(err);
        throw new Error("Usuário ou senha inválidos");
    }
}

async function refreshToken() {
    const refresh_token = getRefreshToken();
    try {
        const res = await api.post("/auth/refreshToken", { refreshToken: refresh_token });

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;
        saveTokens(newAccessToken, newRefreshToken);

    } catch (err) {
        localStorage.clear();
        window.location.replace("/");
    }
}

const authServices = {
    getAccessToken,
    getRefreshToken,
    getRoleFromAccessToken,
    refreshToken,
    signIn,
    getIdFromAccessToken
}

export default authServices;