import React from "react";
import { useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import { MOVIE_LIST_URL, PERSON_SEARCH_URL } from "../utils/constants";
import { PageResult } from "../Models/PageResult";
import { Person } from "../Models/Person";

export default function usePersonSearch(person: string | null = null) {
  const fn = () => {
    return themoviedbApi
      .get<PageResult<Person>>(
        PERSON_SEARCH_URL + person
        //  {
        // params: {
        //   query: person,
        // },      }
      )
      .then((a) => {
        console.log("PersonSearch fetched");
        return a.data.results[0];
      });
  };
  return useQuery({
    queryKey: ["person", person],
    queryFn: fn,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
