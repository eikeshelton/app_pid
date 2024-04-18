import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.62.135.135:8000', // substitua pela URL do seu servidor FastAPI
});

export default api;
