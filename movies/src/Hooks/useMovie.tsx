import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import { MOVIE_LIST_URL } from "../utils/constants";
import { PageResult } from "../Models/PageResult";
import { Movie } from "../Models/Movie";
import { theMovieDbApiClient } from "../services/theMovieDbApiClient";
import MovieService from "../services/MovieService";

export default function useMovie(MovieParams: MovieParams) {
  // const params: MovieParams = {
  //   page: 1,
  //   with_genres: catIds,
  //   include_video: false,
  // };
  console.log(MovieParams, "mp");
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

export type MovieParams = {
  with_genres?: string | number[];
  page?: number;
  with_crew?: string;
  with_companies?: string;
  with_keywords?: string;
  with_people?: string;
  include_video?: boolean;
  sort_by?: string;
  primary_release_year?: Number;
};
