import React from 'react'
import { MovieCard } from './MovieCard';
import { addToFavArray, removeFromFavAray } from "../services/localStorageHelper";
import { Container } from "@material-ui/core"

export const MoviesList = ({movies}) => {
    const handleFavouriteTap = (movie) => {
        const isFav = !movies[movie.id].isFav;
        if (isFav) {
          addToFavArray(movie.id);
        }
        else {
          removeFromFavAray(movie.id);
        }
        // setMovies(prevMovies => updateMovieFav(prevMovies, movie.id, { isFav: isFav }));
      };

    return (
        <div>
            {movies && movies.map(m => (
                <MovieCard key={m.id} movie={m} handleFavouriteTap={handleFavouriteTap}/>
            ))}
        </div>
 
       
    )
}
