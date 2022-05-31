import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:4000/embreo/testing/",
});

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.commin["Authorization"];
    }
};