const MOVIE_DB_API_KEY = "ebea8cfca72fdff8d2624ad7bbf78e4c";
const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3';

const createMovieDbUrl = (relativeUrl, queryParams) => {
    let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY.trim()}&language=en-US`;
    if (queryParams) {
      Object.keys(queryParams)
        .forEach(paramName => baseUrl += `&${paramName}=${queryParams[paramName]}`);
    }
    return baseUrl;
  }

export const getNowPlaying = async ({page}) => {
    const fullUrl = createMovieDbUrl('/movie/now_playing', {
        page
    });
    return fetch(fullUrl);
}

export const getMovieDetails = async ({movieId}) => {
    const fullUrl = createMovieDbUrl(`/movie/${movieId}`);
    return fetch(fullUrl);
}