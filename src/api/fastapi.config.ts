import axios from 'axios';

const FastAPIConfig = axios.create({
  baseURL: '/api/fastapi', // Chỉ sử dụng proxy để tránh CORS
  timeout: 30000, // 30 seconds timeout cho AI prediction
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default FastAPIConfig;

