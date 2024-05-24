import axios, { AxiosResponse } from 'axios';

// Define the base URL for your API
const API_BASE_URL = import.meta.env.VITE_PROXY_URL;

// Create an instance of axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define types for your API responses (adjust as necessary)
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

// Generic GET method
export const get = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<Promise<T>> = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// Generic POST method
export const post = async <T, U>(endpoint: string, data: U): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};