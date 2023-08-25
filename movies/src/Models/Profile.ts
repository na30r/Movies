import { Movie } from "./Movie";

export default interface UserMovies {
  favorite: Movie[];
  watchLater: Movie[];
}
