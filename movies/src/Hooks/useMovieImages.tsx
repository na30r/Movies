import React from "react";
import { useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import {
  BACK_PATH,
  CREDITS_URL,
  IMAGE_PATH,
  MOVIE_ID_PLACEHOLDER,
  MOVIE_IMAGES_URL,
} from "../utils/constants";
import { MovieImage } from "../Models/MovieImage";

export default function useMovieImages(movieId: number) {
  console.log("useCredits fetched");
  return useQuery({
    queryKey: ["images", movieId],
    queryFn: () => {
      const Url = MOVIE_IMAGES_URL.replace(
        MOVIE_ID_PLACEHOLDER,
        movieId.toString()
      );
      return themoviedbApi.get<MovieImage>(Url).then((a) => a.data);
    },
  });
}
