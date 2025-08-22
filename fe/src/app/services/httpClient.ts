import axios from "axios";
import { API_CONFIG } from '../config/api';

export const httpClient = axios.create({
  baseURL: API_CONFIG.baseURL,
});




