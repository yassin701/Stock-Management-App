// services/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001", // your JSON-server or API base URL
});

export default API;
