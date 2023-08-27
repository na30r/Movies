import { useQuery } from "react-query";
import { Genre } from "../Models/Genre";
import { GenreService } from "../services/GenreService";

export default function useGenre() {
  return useQuery<{ genres: Genre[] }>({
    queryKey: ["genres"],
    queryFn: GenreService.getAll,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
