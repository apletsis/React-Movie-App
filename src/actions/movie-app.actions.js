import { createAsyncActionCreator } from '../utils/redux.helpers';
import * as movieService from '../utils/movie-app.service';

export const keys = {
    GET_NOW_PLAYING: 'GET_NOW_PLAYING',
    GET_MOVIE_DETAILS: 'GET_MOVIE_DETAILS',
};

export const getNowPlaying = (page) => createAsyncActionCreator(
    // action type
    keys.GET_NOW_PLAYING,
    // requestFn
    movieService.getNowPlaying,
    // requestParams
    { page }
);

export const getMovieDetails = (movieId) => createAsyncActionCreator(
    keys.GET_MOVIE_DETAILS,
    movieService.getMovieDetails,
    { movieId }
);