import axios from 'axios';

/**
 * Custom axios instance.
 */
const customAxios = {
  withoutToken: () => axios.create({ baseURL: process.env.JOBS_BACKEND_URL }),
};

export default customAxios;
