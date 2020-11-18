import axios from "axios";

let baseApi = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
});

let Api = function () {
  let token = localStorage.getItem("token");
  baseApi.defaults.headers.common["Accept"] = "*/*";
  if (token) {
    baseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return baseApi;
};

export default Api;
