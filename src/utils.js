import loading from 'ora';
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

export const load = loading();

export const httpClient = axios.create({
    baseURL: 'https://api.apilayer.com/unogs',
    timeout: 30 * 1e3,
    headers: { apikey: process.env.API_KEY }
});