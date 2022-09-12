import Axios from 'axios';
import { cloneDeep } from 'lodash';

const baseUrl = process.env.REACT_APP_BE_URL;

const axiosInstance = Axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async config => {
  const clonedConfig = cloneDeep(config);
  const token = 'sample-token';

  clonedConfig.headers.common = {
    Authorization: `Bearer ${token}`,
  };

  return clonedConfig;
});

export default axiosInstance;
