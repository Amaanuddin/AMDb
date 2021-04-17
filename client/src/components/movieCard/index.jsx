import React, { useState } from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";

// Components
import Modal from "../movieModal";
import MovieDetails from "../movieDetails";
// import Spinner from "./Spinner";

// Custom Hook
// import { useMovieFetch } from "../hooks/custom/useMovieFetch";

// Styled Components
import { FavoriteMarker, StyledMovieCard } from "./styles";
// import Loading from "../common/loading";
import { connect } from "react-redux";
import axios from "axios";
import Actions from "../../store/actions";

const MovieCard = (props) => {
  const { image, movie, clickable, user, favMovie } = props
  const [isModal, setModal] = useState(false);

//   const [movie, loading, error] = useMovieFetch(movieId);

//   if (error) return <div>Something went wrong ...</div>;
//   if (loading) return <Loading />;
    
    const toggleFavoriteMovie = async (movieId) => {
        const { updateUser } = props;
        if (favMovie) {
            const removeFavRequest = {
                query: `
            mutation {
                removeMovieFromFavorities(email: "${user.profile.email}", movieID: ${movieId}){ 
                    fav_movies            
                }
            }
        `
            };
            const response = await axios.post(process.env.REACT_APP_GRAPHQL_ENDPOINT, removeFavRequest,{
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
            updateUser({profile: {...user.profile, fav_movies: { ...response.data.data.removeMovieFromFavorities.fav_movies}}})
        }
        else {
            const addFavRequest = {
                query: `
                    mutation {
                        addMovieToFavorities(email: "${user.profile.email}", movieID: ${movieId}){                    
                            fav_movies
                        }
                    }
            `   
            };
            const response = await axios.post(process.env.REACT_APP_GRAPHQL_ENDPOINT, addFavRequest,{
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
            updateUser({profile: {...user.profile, fav_movies: { ...response.data.data.addMovieToFavorities.fav_movies}}})
        }
    };

  return (
    <StyledMovieCard>
      <>
        <Modal isVisible={isModal} onClose={() => setModal(false)}>
          <MovieDetails movie={movie} />
        </Modal>
        {clickable ? (
            <>
                {user.token &&
                    <FavoriteMarker className="card-fav" fav={favMovie} onClick = {() => toggleFavoriteMovie(movie.id, favMovie)}>
                          <FontAwesome className="far fa-bookmark" name="bookmark" size="1x" color="red"/>
                    </FavoriteMarker>
                }
                <img
                    className="clickable"
                    src={image}
                    alt="moviecard"
                    onClick={() => setModal(true)}
                />
                <div className="card-rating">
                    <div>{movie.vote_average}</div>
                </div>
          </>
        ) : (
          <img src={image} alt="moviecard" />
        )}
      </>
    </StyledMovieCard>
  );
};

MovieCard.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  clickable: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (...params) => {
    dispatch(Actions.storeUserProfile.updateUser(...params));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieCard)
