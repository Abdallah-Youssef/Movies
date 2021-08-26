import { AppBar, Tab, Tabs, Container } from "@material-ui/core";

import { useState } from "react";

import { FavouriteMovies } from "./FavouriteMovies";
import { SearchMovies } from "./SearchMovies";

const MoviesPage = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (e, value) => {
    setTab(value);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Explore movies" tabIndex={0} />
          <Tab label="Favourites" tabIndex={1} />
        </Tabs>
      </AppBar>

      <Container>
        {tab === 0 && <SearchMovies />}

        {tab === 1 && <FavouriteMovies />}
      </Container>
    </>
  );
};

export default MoviesPage;
