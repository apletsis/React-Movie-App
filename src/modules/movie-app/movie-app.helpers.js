const TMDB_IMAGE_BASE_URL = (width = 300) => `https://image.tmdb.org/t/p/w${width}`;

const updateMoviePicturesUrls = (movieResult, width = 300) => ({
    ...movieResult,
    backdrop_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.backdrop_path}`,
    poster_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.poster_path}`,
});

export const getMoviesList = (moviesResponse) => {
    return !!moviesResponse ? ([
        ...moviesResponse.results.map(movieResult => updateMoviePicturesUrls(movieResult))
    ]) : null;
}

export const getMoviesTotalResults = (moviesResponse) => {
    return !!moviesResponse ? (moviesResponse.total_results) : null;
}