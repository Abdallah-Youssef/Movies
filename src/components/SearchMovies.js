import React, { useState, useEffect } from "react";
import { searchData } from "../services/api";
import TextField from "@material-ui/core/TextField";
import { MovieCard } from "./MovieCard";
import MoviePagination from "./MoviePagination";

export const SearchMovies = () => {
  const [searchTxt, setSearchTxt] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);

  const updateData = () => {
    if (searchTxt !== "") {
      searchData(searchTxt, currentPage).then(([results, resultsCount]) => {
        setSearchMovies(results);
        setNumOfPages(Math.ceil(resultsCount / 10));
      });
    }
  };

  useEffect(() => {
    updateData();
  }, [currentPage, searchTxt]);

  return (
    <div>
      <TextField
        label="Search"
        id="outlined-margin-dense"
        helperText="Search for movies"
        margin="dense"
        variant="outlined"
        onChange={(event) => setSearchTxt(event.target.value)}
      />

      {searchMovies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}

      <MoviePagination
        numOfPages={numOfPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};
