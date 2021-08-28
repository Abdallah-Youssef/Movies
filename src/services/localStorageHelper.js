
import { getMovieById } from "./api";
import { getCookie } from "./Helpers";


function isInLocalStorage(key) {
    return localStorage.getItem(key) !== null;
}

// used
export function isFavourited(movieId) {
    // return getFavouriteIds().includes(movieId)
    return getFavouriteMovies().then(result => {
        if (!result)
        {
            return false;
        }
        result.map(favorite => favorite.imdb_identification === movieId);
    })
}

function addToFavArray(movieId) {
    let currentFav = getFavouriteIds();


    console.group(`Adding ${movieId} to favourites`)
    console.log("Current favourites", currentFav);

    setFavourites([...currentFav, movieId])
    console.log("After adding: ", getFavouriteIds());

    console.groupEnd()
}

function removeFromFavAray(movieId) {
    let currentFav = getFavouriteIds();
    setFavourites(currentFav.filter(id => id !== movieId))
}

export function clearLocalStorage() {
    localStorage.clear();
}


function setFavourites(favourites) {
    localStorage.setItem('favourites', JSON.stringify(favourites));
}

// used
export function toggleFavourited(movieId) {
    // if (!isFavourited(movieId))
    //     addToFavArray(movieId);
    // else
    //     removeFromFavAray(movieId);

    const userId = getCookie("userId");
    if (!userId)
    {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }
    return fetch(`http://localhost:5001/MoviesMoviesApi/Favourites/toggleFavorited`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: userId, movieId: movieId})
    })
    .then((response) => response.json());
}

// used
export function getFavouriteIds() {
    if (!isInLocalStorage('favourites'))
        localStorage.setItem('favourites', JSON.stringify([]));
    return JSON.parse(localStorage.getItem('favourites'))
}

// used
export function getFavouriteMovies() {
    const userId = getCookie("userId");
    if (!userId)
    {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }
    return fetch(`http://localhost:5001/MoviesMoviesApi/Favourites/${userId}`, {
        method: "GET"
    })
    .then((response) => response.json())
    .then((movies) => 
        movies.map((value) => 
        {
            return {
                ...value,
                imdbID: value.imdb_identification
            }; 
        }
    ));

    // let favouritedIds = getFavouriteIds()
    // return Promise.all(favouritedIds.map(id => getMovieById(id)))
}
