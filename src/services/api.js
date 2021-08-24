
export function searchData(search_term, page_number) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var my_url = `http://www.omdbapi.com/?s=${search_term}&apikey=68005424&page=${page_number}`


    return fetch(my_url, requestOptions)
        .then(response => {
            return response.json();
        }).then(result => {
            console.log(result);
            /**
             * result props
             *  Search : Array of the first 10 results
             *  totalResults: number of results
             */
            if (result.Response === "True"){
                return [
                    result.Search.map((value) => ({ ...value, id: value.imdbID })),
                    result.totalResults
                ]
            }
            else return [[], 0]
        })
}

export function updateMovieFav(movies, movieId, updatedProps) {
    let moviesUpd = { ...movies };
    for (let prop of Object.keys(updatedProps)) {
        moviesUpd[movieId] = { ...moviesUpd[movieId], [prop]: updatedProps[prop] }
    }
    return moviesUpd;
}

