import React from "react";
import { useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import { MOVIE_LIST_URL } from "../utils/constraints";

export default function useMovie(catId: number | null = null) {
  const fn = () => {
    return themoviedbApi
      .get(MOVIE_LIST_URL, {
        params: {
          with_genres: catId,
        },
      })
      .then((a) => {
        console.log(a.data);
        return a.data.results;
      });
  };
  return useQuery({
    queryKey: ["Movie", "categoryId", catId],
    queryFn: fn,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
//"discover/movie?without_genres=16"
interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
