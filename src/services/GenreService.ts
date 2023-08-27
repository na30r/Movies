import { Genre } from "../Models/Genre";
import { Movie } from "../Models/Movie";
import { MovieImage } from "../Models/MovieImage";
import { GENRES_URL } from "../utils/constants";
import { theMovieDbApiClient } from "./theMovieDbApiClient";

export const GenreService = new theMovieDbApiClient<{ genres: Genre[] }>(
  GENRES_URL
);
