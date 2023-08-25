import React from "react";
import { useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import { MovieImage } from "../Models/MovieImage";
import MovieService from "../services/MovieService";

export default function useMovieImages(movieId: number) {
  console.log("useCredits fetched");
  return useQuery({
    queryKey: ["images", movieId],
    queryFn: () => {
      return new MovieService(movieId).getImages(movieId);
    },
  });
}
