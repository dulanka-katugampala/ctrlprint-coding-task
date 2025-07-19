import axios from 'axios';
import { environmentVariables } from '../environmentVariables';

const options = {
  baseURL: environmentVariables.ApiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const axiosClient = axios.create(options);