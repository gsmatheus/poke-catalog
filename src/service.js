import axios from "axios";

export const baseURL = "https://pokeapi.co/api/v2";
const axiosInstance = axios.create({
  baseURL,
});

export const api = {
  get: (endpoint) => axiosInstance.get(endpoint),
}