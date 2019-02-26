import axios from "axios";

const customAxios = {
  withoutToken: () => axios.create({ baseURL: process.env.JOBS_BACKEND_URL }),
};

export default customAxios;
