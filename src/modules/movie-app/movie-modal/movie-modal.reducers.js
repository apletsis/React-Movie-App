import { keys } from './movie-modal.actions';
import { createReducer } from '../../common/redux.helpers';

// Placeholder reducer for our movie modal
const movieModalReducer = createReducer({ isOpen: false, movideId: undefined }, {
    [keys.OPEN_MOVIE_MODAL]: (state, action) => ({
        isOpen: true,
        movieId: action.movieId
    }),
    [keys.CLOSE_MOVIE_MODAL]: (state, action) => ({
        // Persist the movieId (and any other tree objects)
        ...state,
        isOpen: false
    })
});

export default movieModalReducer;