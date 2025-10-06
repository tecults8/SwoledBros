import axios from "axios"

const api = axios.create({
    baseURL: 'api/User',
});

export const userLogin = (user) => api.post('/signup', user);
export const userSignUp = (user) => api.post('/login', user);