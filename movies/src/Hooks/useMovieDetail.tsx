import React from "react";
import { useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import { MovieDetail } from "../Models/MovieDetail";
import { promises } from "dns";

export default function useMovieDetail(movieId: number) {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => {
      return themoviedbApi
        .get<Promise<MovieDetail>>(`movie/${movieId}`)
        .then((a) => {
          console.log(a, "useMovieDetail");
          return a.data;
        });
    },
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
