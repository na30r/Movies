import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import { MOVIE_LIST_URL } from "../utils/constants";
import { PageResult } from "../Models/PageResult";
import { Movie } from "../Models/Movie";
import { MovieParams } from "../Models/MovieParams";
import MovieService from "../services/MovieService";

export default function useMovie(MovieParams: MovieParams) {
  // const params: MovieParams = {
  //   page: 1,
  //   with_genres: catIds,
  //   include_video: false,
  // };

  const fn = ({ pageParam = 1 }) => {
    var movieService = new MovieService();

    return movieService.getAll(MovieParams);
  };
  return useInfiniteQuery({
    queryKey: ["Movie", "categoryId", MovieParams],
    queryFn: fn,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastpage, allpage) => {
      return lastpage.page + 1;
    },
  });
}
