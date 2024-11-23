import axios from 'axios';
export const Ip = '192.168.15.170:8000';
const api = axios.create({
  baseURL: `http://${Ip}`, // substitua pela URL do seu servidor FastAPI
});

export default api;
