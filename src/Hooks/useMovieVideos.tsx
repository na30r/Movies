import React from "react";
import { useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import { MOVIE_ID_PLACEHOLDER, MOVIE_VIDEOS_URL } from "../utils/constants";
import { MovieImage } from "../Models/MovieImage";

export default function useMovieVideos(movieId: number) {
  console.log("useVideo fetched");
  return useQuery({
    queryKey: ["video", movieId],
    queryFn: () => {
      const Url = MOVIE_VIDEOS_URL.replace(
        MOVIE_ID_PLACEHOLDER,
        movieId.toString()
      );
      return themoviedbApi.get<MovieImage>(Url).then((a) => a.data);
    },
  });
}
