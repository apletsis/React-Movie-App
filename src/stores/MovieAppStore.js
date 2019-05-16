import { observable, action } from 'mobx';
import { isNullOrUndefined } from 'util';

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
    @observable favoriteMovies = JSON.parse(localStorage.getItem('Favotire List')) || [];
    @observable isLoading = false;
    @observable activePage = 1;
    @observable totalMovies = 0;
    @observable isOpen = false;
    @observable isButtonDisabled = false;
    

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

        this.totalMovies = json.total_results;
        
    }

    @action clearMoviesList = async () => {
        this.movies = [];
    }

    @action handlePageChange = async (pageNumber) => {
        await this.clearMoviesList();
        await this.getNowPlaying(pageNumber);
        this.activePage = pageNumber;
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
        this.checkIfFavorite();
        this.isLoading = false;
    }

    @action formatDate = (date) => {
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

    @action goToNextMovie = (movies) => {
        const currentArrayIndex = movies.findIndex(x => x.id === this.movie.id);
        const nextIndex = currentArrayIndex + 1;

        if (nextIndex <= movies.length - 1) {
            const nextMovieId = movies[nextIndex]['id'];
            this.getMovieDetails(nextMovieId);
        } else if (nextIndex === movies.length || currentArrayIndex === movies.length) {
            const nextMovieId = movies[0]['id'];
            this.getMovieDetails(nextMovieId);
        } else {
            const nextMovieId = movies[nextIndex]['id'];
            this.getMovieDetails(nextMovieId);
        }
    }

    @action addToFavorites = (movie) => {
        const prevFav = JSON.parse(localStorage.getItem('Favotire List')) || [];
        const currFav = [...prevFav, movie];

        localStorage.setItem('Favotire List', JSON.stringify(currFav));
        this.isButtonDisabled = true;
    }

    @action checkIfFavorite = () => {
        const currentId = this.movie.id;
        if (!isNullOrUndefined(currentId)) {
            const favList = JSON.parse(localStorage.getItem('Favotire List'));
            if (favList) {
                const inList = favList.findIndex(x => x.id === currentId);
                inList !== -1 ? this.isButtonDisabled = true : this.isButtonDisabled = false;   
            }
        } else {
            this.isButtonDisabled = false;
        }
    }

    @action removeFromFavorites = (movie) => {
        const favList = JSON.parse(localStorage.getItem('Favotire List'));
        const filteredItems = favList.filter(x => x.id !== movie.id);
        localStorage.setItem('Favotire List', JSON.stringify(filteredItems));
        this.favoriteMovies = JSON.parse(localStorage.getItem('Favotire List'));
    }

}

export default new MovieStore();