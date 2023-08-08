import { MovieParams } from "../Models/MovieParams";
import {
  MOVIE_LIST_URL,
  THEMOVIEDB_BASE_URL,
  THEMOVIEDB_BEARER_TOKEN,
} from "../utils/constants";
import axios from "axios";
import MovieService from "./MovieService";

export class theMovieDbApiClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  themoviedbApi = axios.create({
    baseURL: THEMOVIEDB_BASE_URL,
    headers: {
      Accept: "application/json",
      Authorization: THEMOVIEDB_BEARER_TOKEN,
    },
  });

  getAll = (
    params: MovieParams | object | undefined = undefined
  ): Promise<T> => {
    return this.themoviedbApi.get<T>(this.endpoint, { params }).then((a) => {
      return a.data;
    });
  };
}
