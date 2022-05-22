import axios from "axios";
const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
export default instance;