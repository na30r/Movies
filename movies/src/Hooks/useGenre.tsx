import React from "react";
import { useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import { GENRES_URL } from "../utils/constraints";
import { Genre } from "../Models/Genre";

export default function useGenre() {
  const fn = () => {
    return themoviedbApi.get(GENRES_URL).then((a) => {
      console.log("genres fetched");
      return a.data.genres;
    });
  };
  return useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: fn,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
