import axios from "axios";
import { THEMOVIEDB_BASE_URL, THEMOVIEDB_BEARER_TOKEN } from "./constants";

export const themoviedbApi = axios.create({
  baseURL: THEMOVIEDB_BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: THEMOVIEDB_BEARER_TOKEN,
  },
});
