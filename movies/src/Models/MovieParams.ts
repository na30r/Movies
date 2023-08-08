export type MovieParams = {
  with_genres?: string | number[];
  page?: number;
  with_crew?: string;
  with_companies?: string;
  with_keywords?: string;
  with_people?: string;
  include_video?: boolean;
  sort_by?: sortBy;
  primary_release_year?: Number;
};
export type sortBy =
  | "popularity.asc"
  | "popularity.desc"
  | "revenue.asc"
  | "revenue.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc";
