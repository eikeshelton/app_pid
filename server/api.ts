import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.69:8000', // substitua pela URL do seu servidor FastAPI
});

export default api;
