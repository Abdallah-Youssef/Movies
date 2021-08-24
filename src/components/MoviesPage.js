import { AppBar, Button, InputBase, makeStyles, Tab, Tabs } from "@material-ui/core"

import { useState, useEffect } from "react"
import { searchData } from "../services/api";
import AllMovies from "./AllMovies";
import Pagination from '@material-ui/lab/Pagination';
import { MovieCard } from "./MovieCard";
import { MoviesList } from "./MoviesList";

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(73)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const MoviesPage = () => {
    const classes = useStyles();
    const [tab, setTab] = useState(0);
    const [searchTxt, setSearchTxt] = useState("");
    const [searchMovies, setSearchMovies] = useState([]);

    const [currentPage, setCurrentPage] = useState(0)
    const [numOfPages, setNumOfPages] = useState(0)
    const updateData = () => {
        if (searchTxt !== "") {
            searchData(searchTxt, currentPage).then(([results, resultsCount]) => {
                setSearchMovies(results);
                setNumOfPages(Math.ceil(resultsCount / 10))
                window.scrollTo(0, 0)
            })
        }
    }

    useEffect(() => {
        updateData()
    }, [currentPage])


    const handleChange = (e, value) => {
        setTab(value)
    }


    const onButtonClick = (e) => {
        if(currentPage === 1)
            updateData()
        setCurrentPage(1);
        // if (searchTxt !== "") {
        //     searchData(searchTxt, 1).then(([results, resultsCount]) => {
        //         setSearchMovies(results);
        //         setNumOfPages(Math.ceil(resultsCount / 10))
        //         console.log(results);
        //     })
        // }
    }


    return (

        <>
            <AppBar position="static">
                <Tabs value={tab} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Explore movies" tabIndex={0} />
                    <Tab label="Favourites" tabIndex={1} />
                </Tabs>
                <InputBase
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    onChange={(event) => {
                        setSearchTxt(event.target.value)
                    }}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
                <Button variant="contained" color="primary" onClick={onButtonClick}>
                    Search
                </Button>
            </AppBar>


            {tab === 0 &&
                (
                    <div position="center">
                        <MoviesList movies={searchMovies}/>

                        {/* <AllMovies movies={searchMovies}/> */}
                        {/* <Pagination class= "center"/> */}
                    </div>
                )}

            {tab === 1 && (
                <h1>
                    Favourites
                </h1>
            )}

            {numOfPages > 0 && (

                <Pagination
                    count={numOfPages}
                    page={currentPage}
                    onChange={(e, v) => { setCurrentPage(v) }}
                />

            )}



            {/* <MovieCard movie={{
    "Title": "The L Word",
    "Year": "2004–2009",
    "imdbID": "tt0330251",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNTFjNzBlZDMtNzk0MS00NzhjLTgzODEtY2ZmMGQyMDZmMDNiXkEyXkFqcGdeQXVyMTA1OTAyOTI@._V1_SX300.jpg",
    "id": "tt0330251"
}}/> */}



        </>
    )
}

export default MoviesPage