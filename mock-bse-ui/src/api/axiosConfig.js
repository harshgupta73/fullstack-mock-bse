import axios from "axios";

const api = axios.create({
    baseURL: "https://fullstack-mock-bse.onrender.com"
});

export default api;