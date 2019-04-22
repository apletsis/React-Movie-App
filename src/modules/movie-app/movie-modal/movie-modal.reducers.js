import { keys } from './movie-modal.actions';
import { createReducer } from '../../common/redux.helpers';

// Placeholder reducer for our movie modal
const movieModalReducer = createReducer({ isOpen: false, movideId: undefined, favoriteList: [] }, {
    [keys.OPEN_MOVIE_MODAL]: (state, action) => ({
        isOpen: true,
        movieId: action.movieId
    }),
    [keys.NEXT_MOVIE_MODAL]: (state, action) => ({
        isOpen: true,
        movieId: action.movieId
    }),
    [keys.SAVE_TO_FAVORITE]: (state, action) => ({
        isOpen: true,
        movie: action.movie,
        favoriteList: action.favoriteList.push(action.movie),
        test: 'test'
    }),
    [keys.CLOSE_MOVIE_MODAL]: (state, action) => ({
        isOpen: false
    })
});

export default movieModalReducer;