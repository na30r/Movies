import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { MovieParams } from "../Models/MovieParams";
import MovieService from "../services/MovieService";

export default function useMovie(MovieParams: MovieParams, enable: boolean) {
  return useInfiniteQuery({
    enabled: enable,
    queryKey: ["Movies", MovieParams],
    queryFn: (input: any) => {
      var movieService = new MovieService();
      MovieParams.page = input.pageParam;
      return movieService.getAll(MovieParams);
    },
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastpage, allpage) => {
      return lastpage.page + 1;
    },
  });
}
