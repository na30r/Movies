import React from "react";
import { useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";

export default function useMovieDetail(movieId: number) {
  //   console.log(movieId, "here");
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => {
      return themoviedbApi.get(`movie/${movieId}`).then((a) => {
        console.log(a, "useMovieDetail");
        return a.data;
      });
    },
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
