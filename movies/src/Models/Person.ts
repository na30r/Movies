import { KnownFor } from "./KnownFor";
import { Movie } from "./Movie";

export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for: Movie[];
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: string;
  profile_path: string;
}
