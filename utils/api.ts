import { movieapikey } from "./apikey";
import axios, { AxiosRequestConfig } from "axios";

// Endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular`;
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated`;
const genresEndpoint = `${apiBaseUrl}/genre/movie/list`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie`;

// Movie Details Endpoint
const movieDetailsEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}`;

const movieCreditsEndpoint = (id: number) =>
  `${apiBaseUrl}/movie/${id}/credits`;

const similarMoviesEndpoint = (id: number) =>
  `${apiBaseUrl}/movie/${id}/similar`;

// Cast Api call to get cast of movie
const personDetailsEndpoint = (id: number) => `${apiBaseUrl}/person/${id}`;

const personMovieEndpoint = (id: number) =>
  `${apiBaseUrl}/person/${id}/movie_credits`;

// Api call to get movies
const movieApiCall = async (endpoint: string, params?: object) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: endpoint,
    params: params || {},
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${movieapikey}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// Functions to get Images of different sizes and width
export const image500 = (posterpath: string) =>
  posterpath
    ? `https://image.tmdb.org/t/p/w500${posterpath}`
    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

// Home Screen Apis
export const fetchTrendingMovie = (page: number = 1) => {
  return movieApiCall(trendingMoviesEndpoint, { page });
};

export const fetchPopularMovie = (page: number = 1) => {
  return movieApiCall(popularMoviesEndpoint, { page });
};

export const fetchUpComingMovie = (page: number = 1) => {
  return movieApiCall(upComingMoviesEndpoint, { page });
};

export const fetchTopRatedMovie = (page: number = 1, genreId?: number) => {
  const params: any = { page };
  if (genreId) params.with_genres = genreId;
  return movieApiCall(topRatedMoviesEndpoint, params);
};

export const fetchGenres = () => {
  return movieApiCall(genresEndpoint);
};

export const fetchMovieDetails = (id: number) => {
  return movieApiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (movieId: number) => {
  return movieApiCall(movieCreditsEndpoint(movieId));
};

export const fetchSimilarMovies = (movieId: number) => {
  return movieApiCall(similarMoviesEndpoint(movieId));
};

export const searchMovies = (params: object) => {
  return movieApiCall(searchMoviesEndpoint, params);
};

// Cast functions to fetch data
export const fetchPersonDetails = (id: number) => {
  return movieApiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id: number) => {
  return movieApiCall(personMovieEndpoint(id));
};
