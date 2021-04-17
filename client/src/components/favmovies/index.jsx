/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import MovieWall from "../movieWall";
import MovieCard from "../movieCard";
import NoImage from '../../assets/no_image.jpg'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
const FavoriteMovies = props => {

    if (!props.user.token) {
    return <Redirect to="/" />
    }

    const favMovies = props.user.profile.fav_movies;
    const [movies, setMovies] = useState(favMovies);

    useEffect(() => {
        setMovies(props.user.profile.fav_movies);
    }, [props.user.profile.fav_movies]);
    return (
      <>

        <MovieWall header={"Favorite Movies"}>
          {Object.keys(movies).map((movieId) => (
            <>
              <MovieCard
                key={movieId}
                clickable
                image={
                  movies[movieId].poster_path
                    ? process.env.REACT_APP_IMAGE_BASE_URL + process.env.REACT_APP_POSTER_SIZE + movies[movieId].poster_path
                    : NoImage
                }
                movie={movies[movieId]}
                favMovie={movies[movieId].isFavorite}
              />
            </>
          ))}
        </MovieWall>
      </>
    );
    
};
const mapStateToProps = ({ user }) => ({
  user
});

export default connect(
  mapStateToProps
)(FavoriteMovies);