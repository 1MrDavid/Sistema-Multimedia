import axios from 'axios';

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const registerUser = async (userData) => {
    try {
        const response = await api.post("/user/register/", userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post("/token/", userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};