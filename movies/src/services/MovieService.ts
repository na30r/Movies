import { MovieParams } from "../Models/MovieParams";
import { Credits } from "../Models/Credits";
import { Genre } from "../Models/Genre";
import { Movie } from "../Models/Movie";
import { MovieImage } from "../Models/MovieImage";
import { PageResult } from "../Models/PageResult";
import { Company } from "../Models/Company";
import {
  MOVIE_IMAGES_URL,
  MOVIE_ID_PLACEHOLDER,
  GENRES_URL,
  MOVIE_LIST_URL,
  BACK_PATH,
  CREDITS_URL,
  Company_SEARCH_URL,
} from "../utils/constants";
import { theMovieDbApiClient } from "./theMovieDbApiClient";

class MovieService extends theMovieDbApiClient<PageResult<Movie>> {
  // public movieId?: number;
  constructor(movieId?: number) {
    super(MOVIE_LIST_URL);
    // this.movieId = movieId;
  }

  getCompany = (company?: string): Promise<PageResult<Company>> => {
    console.log(company, "com");
    return this.themoviedbApi
      .get<PageResult<Company>>(`${Company_SEARCH_URL}${company}`)
      .then((a) => {
        console.log(a.data);
        return a.data;
      });
  };

  getGenres() {
    return this.themoviedbApi.get(GENRES_URL).then((a) => {
      return a.data.genres;
    });
  }
  getImages(movieId: number): Promise<MovieImage> {
    return this.themoviedbApi
      .get<MovieImage>(
        MOVIE_IMAGES_URL.replace(MOVIE_ID_PLACEHOLDER, movieId?.toString())
      )
      .then((a) => a.data);
  }
  getVideo() {}
  // getDetail() {
  //   return themoviedbApi.get(`movie/${movieId}`).then((a) => {
  //     return a.data;
  //   });
  // }
  getCast(movieId: number) {
    const creditsUrl = CREDITS_URL.replace(
      MOVIE_ID_PLACEHOLDER,
      movieId.toString()
    );
    return this.themoviedbApi.get<Credits>(creditsUrl).then((a) => {
      return {
        cast: a.data.cast.slice(0, 9).map((c) => {
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
  }

  geturl() {}
}

export default MovieService;
