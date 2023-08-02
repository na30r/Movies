import React from "react";
import { useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import { MOVIE_LIST_URL } from "../utils/constants";

export default function useMovie(catId: number | null = null) {
  const fn = () => {
    return themoviedbApi
      .get(MOVIE_LIST_URL, {
        params: {
          with_genres: catId,
        },
      })
      .then((a) => {
        console.log("movie fetched", a);
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
