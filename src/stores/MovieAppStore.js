import { observable, action } from 'mobx';

const MOVIE_DB_API_KEY = "ebea8cfca72fdff8d2624ad7bbf78e4c";
const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3';

const TMDB_IMAGE_BASE_URL = (width = 300) => `https://image.tmdb.org/t/p/w${width}`;

const createMovieDbUrl = (relativeUrl, queryParam) => {
    let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY.trim()}&language=en-US`;
    if (queryParam) {
     
        baseUrl += `&page=${queryParam}`;
    }
    return baseUrl;
}

class MovieStore {
    
    @observable movie = {};
    @observable movies = [];
    @observable isLoading = false;
    @observable isOpen = false;

    @action updateMoviePicturesUrls = (movieResult, width = 300) => {
        if (movieResult) {
          return {
            ...movieResult,
            backdrop_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.backdrop_path}`,
            poster_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.poster_path}`,
          }
        }
        return {};
    };

    @action getNowPlaying = async (page) => {
        this.isLoading = true;
        const fullUrl = createMovieDbUrl('/movie/now_playing', page);
        const response = await fetch(fullUrl);
        const json = await response.json();

        json.results.forEach(item => {
            return this.movies.push(this.updateMoviePicturesUrls(item));
        });
        this.isLoading = false;

        return json.total_results;
        
    }

    @action clearMoviesList = async () => {
        this.movies = [];
    }

    @action closeMovieModal = () => {
        this.isOpen = false;
    }

    @action getMovieDetails = async (movieId) => {
        this.isOpen = true;
        this.isLoading = true;
        const fullUrl = createMovieDbUrl(`/movie/${movieId}`);
        const response = await fetch(fullUrl);
        const json = await response.json();
        this.movie = {...json};
        this.isLoading = false;
    }

}

export default new MovieStore();