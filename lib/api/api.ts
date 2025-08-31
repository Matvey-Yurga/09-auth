import axios, { AxiosError } from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';
export type ApiError = AxiosError<{ error: string }>;
export const NextServer = axios.create({
    baseURL,
    withCredentials: true
})