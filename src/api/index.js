import axios from 'axios';

export const employeeApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
