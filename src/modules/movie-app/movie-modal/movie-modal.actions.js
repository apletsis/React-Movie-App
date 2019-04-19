// List of movie modal action type keys
export const keys = {
    'OPEN_MOVIE_MODAL': 'OPEN_MOVIE_MODAL',
    'CLOSE_MOVIE_MODAL': 'CLOSE_MOVIE_MODAL',
    'NEXT_MOVIE_MODAL': 'NEXT_MOVIE_MODAL',
    'SAVE_TO_FAVORITE': 'SAVE_TO_FAVORITE',
}

// Opens the <MovieModal /> with movieId
export const openMovieModal = (movieId) => {
    return {
        type: keys.OPEN_MOVIE_MODAL,
        movieId
    };
}

// Change movieId on "Next movie" button click
export const nextMovieModal = (movieId, movieList) => {
    return {
        type: keys.NEXT_MOVIE_MODAL,
        movieId,
        movieList
    }
}

// Close the <MovieModal />
export const closeMovieModal = () => {
    return {
        type: keys.CLOSE_MOVIE_MODAL
    }
}

export const addToFavorites = (movie, favoriteList) => {
    return {
        type: keys.SAVE_TO_FAVORITE,
        movie,
        favoriteList
    }
}