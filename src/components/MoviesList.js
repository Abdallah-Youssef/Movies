import React from 'react'
import { MovieCard } from './MovieCard';
import { addToFavArray, removeFromFavAray } from "../services/localStorageHelper";
import { Container } from "@material-ui/core"
import { isFavourited } from '../services/localStorageHelper';

export const MoviesList = ({movies}) => {


    return (
        <div>
            {movies && movies.map(m => (
                <MovieCard key={m.id} movie={m}/>
            ))}
        </div>
 
       
    )
}
