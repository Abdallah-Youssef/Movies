
/**
 * This helper should be singelton class
 */


function isInLocalStorage(key) {
    return localStorage.getItem(key) !== null;
}

export function isFavourited(movieId) {
    return getFavourites().includes(movieId)
}

function addToFavArray(movieId) {
    let currentFav = getFavourites();


    console.group(`Adding ${movieId} to favourites`)
    console.log("Current favourites", currentFav);

    setFavourites([...currentFav, movieId])
    console.log("After adding: ", getFavourites());

    console.groupEnd()
}

function removeFromFavAray(movieId) {
    let currentFav = getFavourites();
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

export function getFavourites() {
    if (!isInLocalStorage('favourites'))
        localStorage.setItem('favourites', JSON.stringify([]));
    return JSON.parse(localStorage.getItem('favourites'))
}

