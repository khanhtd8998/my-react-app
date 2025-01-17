import axios from 'axios'

const getToken = () => {
    return localStorage.getItem('accessToken');
}
const instance = axios.create({
    // baseURL: import.meta.env.VITE_BASE_URL
    baseURL: "http://localhost:8080/api",
    headers: {
        'Content-Type': 'application/json',
    }
})

instance.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = getToken()
            ? `Bearer ${getToken()}`
            : undefined;
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
export default instance
