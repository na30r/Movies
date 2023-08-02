import { KnownFor } from "./KnownFor";

export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownFor[];
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: string;
  profile_path: string;
}
