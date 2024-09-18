import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'baseurl', //  backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
 
});

export default axiosInstance;
