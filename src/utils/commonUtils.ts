import axios, { AxiosInstance } from "axios";


export const commonApiRequest : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',  // Default headers
      },
      withCredentials:true

})
