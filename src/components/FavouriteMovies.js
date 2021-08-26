import React, { useState, useEffect } from "react";
import { getFavouriteMovies } from "../services/localStorageHelper";
import { MovieCard } from "./MovieCard";
import MoviePagination from "./MoviePagination";
export const FavouriteMovies = () => {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadFavouriteMovies = () => {
    getFavouriteMovies().then((res) => setFavouriteMovies(res));
  };

  useEffect(() => {
    loadFavouriteMovies();
  }, []);

  return (
    <div>
      {favouriteMovies
        .slice((currentPage - 1) * 10, currentPage * 10)
        .map((m, i) => (
          <MovieCard
            key={i}
            movie={m}
            onFavouriteCallBack={loadFavouriteMovies}
          />
        ))}

      <MoviePagination
        numOfPages={Math.ceil(favouriteMovies.length / 10)}
        onPageChange={(newPage)=>setCurrentPage(newPage)}
      />
    </div>
  );
};
