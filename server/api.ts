import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.62.134.158:8000', // substitua pela URL do seu servidor FastAPI
});

export default api;
