import { Logo, Poster, backdrop } from "./Backdrop";

export interface MovieImage {
  id: number;
  backdrops: backdrop[];
  logos: Logo[];
  posters: Poster[];
}
