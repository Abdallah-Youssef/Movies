import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import image from '../assets/generic_poster.jfif'
import { clearLocalStorage, getFavouriteIds, isFavourited, toggleFavourited } from '../services/localStorageHelper';
// {
//     "Title": "The L Word",
//     "Year": "2004–2009",
//     "imdbID": "tt0330251",
//     "Type": "series",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNTFjNzBlZDMtNzk0MS00NzhjLTgzODEtY2ZmMGQyMDZmMDNiXkEyXkFqcGdeQXVyMTA1OTAyOTI@._V1_SX300.jpg"
// }
export const MovieCard = ({movie, onFavouriteCallBack = ()=>{} }) => {
    const [favourited, setFavourited] = useState(isFavourited(movie.imdbID))
    const handleFavouriteTap = () => {
        toggleFavourited(movie.imdbID)
        setFavourited(isFavourited(movie.imdbID))
        onFavouriteCallBack()
    };

    const handleShareTap = () => {
        console.log(isFavourited(movie.id));
        console.log(getFavouriteIds());
        console.log(movie.id);
        console.log(movie);
    }

    return (
        <Card style={{ margin: "2em" }}>
            <CardMedia
                component="img"
                src={movie.Poster !== "N/A" ? movie.Poster : image}

                title="Movie Poster"
                style={{ maxWidth: "200px", margin: "auto", border: "5px solid grey", borderRadius: "5%" }}
            />

            <CardContent>
                <Typography variant="h3" >
                    {movie.Title}
                </Typography>
                <Typography variant="h5" color="textSecondary" >
                    {movie.Year}, {movie.Type}
                </Typography>
            </CardContent>

            <CardActions>
                <IconButton 
                aria-label="add to favorites" 
                style={{ color: (favourited ? "gold" : "grey") }} 
                onClick={handleFavouriteTap}>
                    <FavoriteIcon />
                </IconButton>

                <IconButton
                    aria-label="share"
                    onClick={handleShareTap}
                    >

                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}
