import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.251.141:1000/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
