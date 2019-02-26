import axios from "axios";

const customAxios = {
  withoutToken: () => axios.create({ baseURL: "https://jobs-back.tko-aly.fi" }),
};

export default customAxios;
