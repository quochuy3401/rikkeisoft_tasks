import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://english-backend-v2.herokuapp.com',
    headers: {
        'content-type': 'application/json',
    }
})

// axiosInstance.interceptors.request.use(
//     (config) => new Promise((resolve) => setTimeout(() => resolve(config), 700))
// )
export default axiosInstance;
