import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.62.133.119:8000', // substitua pela URL do seu servidor FastAPI
});

export default api;
