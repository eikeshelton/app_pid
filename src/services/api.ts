import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.75.55:8000', // substitua pela URL do seu servidor FastAPI
});

export default api;
