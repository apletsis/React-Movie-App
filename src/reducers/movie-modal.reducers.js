import { keys } from '../actions/movie-modal.actions';
import { createReducer } from '../utils/redux.helpers';

// Placeholder reducer for our movie modal
const movieModalReducer = createReducer({ isOpen: false, movideId: undefined}, {
    [keys.OPEN_MOVIE_MODAL]: (state, action) => ({
        ...state,
        isOpen: true,
        movieId: action.movieId
    }),
    [keys.NEXT_MOVIE_MODAL]: (state, action) => ({
        ...state,
        isOpen: true,
        movieId: action.movieId
    }),
    [keys.SAVE_TO_FAVORITE]: (state, action) => ({
        ...state,
        isOpen: true,
        movie: action.movie
    }),
    [keys.CLOSE_MOVIE_MODAL]: (state, action) => ({
        ...state,
        isOpen: false
    })
});

export default movieModalReducer;