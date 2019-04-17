import { combineReducers } from 'redux';
import { createAsyncReducer } from '../common/redux.helpers';
import { keys as movieActionKeys } from './movie-app.actions';
import movieModalReducer from './movie-modal/movie-modal.reducers';

// This will create a new state with both the existing
// movies and new pages of movies
const moviesSuccessReducer = (state, action) => {
    // Create a new state object to be returned
    // when creating the new state, be sure to include any
    // existing properties we want to persist
    return {
        ...state,
        isLoading: false,
        response: {
            ...action.response,
            results: [
                ...action.response.results
            ]
        }
    };
}

// Combines our movie app related reducers to build our movieApp reducer
const movieAppReducer = combineReducers({
    movieModal: movieModalReducer,
    featuredMovies: createAsyncReducer(movieActionKeys.GET_NOW_PLAYING, {
        [`${movieActionKeys.GET_NOW_PLAYING}_SUCCESS`]: moviesSuccessReducer
    }),
    movieDetails: createAsyncReducer(movieActionKeys.GET_MOVIE_DETAILS)
});

export default movieAppReducer;