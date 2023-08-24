import React from "react";
import { useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import { MovieDetail } from "../Models/MovieDetail";

export default function useMovieDetail(movieId: number) {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => {
      return themoviedbApi.get<Promise<MovieDetail>>(`movie/${movieId}`).then((a) => {
        return a.data;
      });
    },
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
