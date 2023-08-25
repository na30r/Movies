export const THEMOVIEDB_BASE_URL = "https://api.themoviedb.org/3/";
export const THEMOVIEDB_BEARER_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTJlYzUzMTIxODkwNWQzYTg4NTc5MjZmNjcwYjdhMCIsInN1YiI6IjY0YmU1Y2MwYWM2Yzc5MDhkY2MwMmYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NlG7af9yas5dVbm_pGbKZFgGEmCXTkDt99H27NUBcak";
export const BASE_MOVIE_URL = "https://api.themoviedb.org/3/movie";
export const GENRES_URL = "genre/movie/list";
export const MOVIE_LIST_URL = "discover/movie?";
export const IMAGE_PATH = "https://image.tmdb.org/t/p/w440_and_h660_face";
export const BACK_PATH = "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2";
// export const CREDITS_URL = "https://api.themoviedb.org/3/movie/1234/credits";
export const MOVIE_ID_PLACEHOLDER = "{movieId}";
export const CREDITS_URL = `${BASE_MOVIE_URL}/{movieId}/credits`;
export const MOVIE_IMAGES_URL = `${BASE_MOVIE_URL}/{movieId}/images`;
export const MOVIE_RECOMANDATION_URL = `${BASE_MOVIE_URL}/{movieId}/recommendations`;
export const MOVIE_REVIEWS_URL = `${BASE_MOVIE_URL}/{movieId}/reviews`;
export const MOVIE_VIDEOS_URL = `${BASE_MOVIE_URL}/{movieId}/videos`;
export const PERSON_SEARCH_URL =
  "https://api.themoviedb.org/3/search/person?query=";

export const Company_SEARCH_URL =
  "https://api.themoviedb.org/3/search/company?query=";
