import axios from 'axios';
import { environmentVariables } from '../environmentVariables';

const options = {
  baseURL: environmentVariables.ApiUrl,
  timeout: 10000,
};

export const axiosClient = axios.create(options);