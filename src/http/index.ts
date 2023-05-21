import axios from "axios";

export const greenApi = axios.create({
  baseURL: "https://api.green-api.com",
});
