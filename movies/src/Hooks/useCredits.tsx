import { useQuery } from "react-query";
import MovieService from "../services/MovieService";
const movieService = new MovieService();

export default function useCredits(movieId: number) {
  console.log("useCredits fetched");
  return useQuery({
    queryKey: ["credits", movieId],
    queryFn: () => movieService.getCast(movieId),
  });
}
