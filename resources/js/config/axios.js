import axios from 'axios';

//axios.defaults.withCredentials = true; 
axios.defaults.baseURL = 'http://127.0.0.1:8000'; 
const token = localStorage.getItem('authToken');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
