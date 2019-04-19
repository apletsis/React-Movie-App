import { keys } from './movie-modal.actions';
import { createReducer } from '../../common/redux.helpers';

// Placeholder reducer for our movie modal
const movieModalReducer = createReducer({ isOpen: false, movideId: undefined }, {
    [keys.OPEN_MOVIE_MODAL]: (state, action) => ({
        isOpen: true,
        movieId: action.movieId,
    }),
    [keys.NEXT_MOVIE_MODAL]: (state, action) => ({
        isOpen: true,
        movieId: action.movieId,
        movieList: action.movieList
    }),
    [keys.SAVE_TO_FAVORITE]: (state, action) => {
        return {
            isOpen: true,
            movie: action.movie,
            favoriteList: action.favoriteList
        }
    },
    [keys.CLOSE_MOVIE_MODAL]: (state, action) => ({
        isOpen: false
    })
});

export default movieModalReducer;