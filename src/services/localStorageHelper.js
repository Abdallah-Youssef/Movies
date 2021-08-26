
import { getMovieById } from "./api";


function isInLocalStorage(key) {
    return localStorage.getItem(key) !== null;
}

export function isFavourited(movieId) {
    return getFavouriteIds().includes(movieId)
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

export function toggleFavourited(movieId) {
    if (!isFavourited(movieId))
        addToFavArray(movieId);
    else
        removeFromFavAray(movieId);
}

export function getFavouriteIds() {
    if (!isInLocalStorage('favourites'))
        localStorage.setItem('favourites', JSON.stringify([]));
    return JSON.parse(localStorage.getItem('favourites'))
}

export function getFavouriteMovies() {
    let favouritedIds = getFavouriteIds()
    return Promise.all(favouritedIds.map(id => getMovieById(id)))
}
