import axios from 'axios';
import {url_key} from '@env';

const api = axios.create({
  baseURL: url_key, // substitua pela URL do seu servidor FastAPI
});

export default api;
