import axios from 'axios';

//axios.defaults.withCredentials = true; 
axios.defaults.baseURL = 'https://pemakaman.alwaysdata.net'; 
const token = localStorage.getItem('authToken');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
