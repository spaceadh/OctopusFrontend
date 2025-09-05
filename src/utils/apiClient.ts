import axios from 'axios'

const API_URL = import.meta.env['VITE_API_URL'] || 'http://localhost:5000/api';

export const ProtectedAPIUtil = (accessToken:string) => {  
    return axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${accessToken || ''}`,
      },
      withCredentials: true, // VERY IMPORTANT to send the cookie
    });
};

export const PublicAPIUtil = () => {
  return axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};