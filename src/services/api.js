export function searchData(search_term, page_number) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  var my_url = `http://www.omdbapi.com/?s=${search_term}&apikey=68005424&page=${page_number}`;

  return fetch(my_url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      /**
       * result props
       *  Search : Array of the first 10 results
       *  totalResults: number of results
       */
      if (result.Response === "True") {
        return [
          result.Search.map((value) => ({ ...value, id: value.imdbID })),
          result.totalResults,
        ];
      } else return [[], 0];
    });
}

// used
export function getMovieById(id) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(`http://www.omdbapi.com/?&apikey=68005424&i=${id}`, requestOptions)
    .then((response) => response.json())
    
}
// export function updateMovieFav(movies, movieId, updatedProps) {
//   let moviesUpd = { ...movies };
//   for (let prop of Object.keys(updatedProps)) {
//     moviesUpd[movieId] = { ...moviesUpd[movieId], [prop]: updatedProps[prop] };
//   }
//   return moviesUpd;
// }

export function login(username, password)
{
  return fetch(`http://localhost:5001/MoviesUsersApi/Users/authenticate`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username, password: password})
  });
}

export function signup(username, email, password)
{
  return fetch(`http://localhost:5001/MoviesUsersApi/Users`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username, email: email, password: password})
  });
}


