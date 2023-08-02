import React from "react";
import { useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import {
  BACK_PATH,
  CREDITS_URL,
  IMAGE_PATH,
  MOVIE_ID_PLACEHOLDER,
} from "../utils/constants";
import { Credits } from "../Models/Credits";

export default function useCredits(movieId: number) {
  console.log("useCredits fetched");
  return useQuery({
    queryKey: ["credits", movieId],
    queryFn: () => {
      const creditsUrl = CREDITS_URL.replace(
        MOVIE_ID_PLACEHOLDER,
        movieId.toString()
      );
      console.log(creditsUrl);
      return themoviedbApi.get<Credits>(creditsUrl).then((a) => {
        return {
          cast: a.data.cast.slice(0, 9).map((c) => {
            console.log(c.credit_id);
            return {
              id: c.credit_id,
              title: c.name,
              avatar: BACK_PATH + c.profile_path,
              description: c.character,
            };
          }),
          crew: a.data.crew.slice(0, 9).map((c) => {
            return {
              title: c.name,
              avatar: BACK_PATH + c.profile_path,
              description: c.job,
            };
          }),
        };
      });
    },
  });
}
