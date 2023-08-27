import { useQuery } from "react-query";
import MovieService from "../services/MovieService";

const movieService = new MovieService();

export default function useCompany(companySearch?: string) {
  console.log("comsearch", companySearch);
  return useQuery({
    queryKey: ["companies", companySearch],
    queryFn: () => movieService.getCompany(companySearch),
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
