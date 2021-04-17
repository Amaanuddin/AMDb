import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";

// Styled Components
import { FavoriteMarker } from "./styles";
import { connect } from "react-redux";
import axios from "axios";
import Actions from "../../store/actions";

const FavoriteMarkerIcon = (props) => {
  const { movieId, user, favMovie } = props
    
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

    if (user.token) {
        return (
            <FavoriteMarker className="card-fav" fav={favMovie} onClick={() => toggleFavoriteMovie(movieId, favMovie)} >
                <FontAwesome className="far fa-bookmark" name="bookmark" color="red" />
            </FavoriteMarker>
                
        );
    }
    else {
        return <></>
    }
};

FavoriteMarkerIcon.propTypes = {
    favMovie: PropTypes.bool,
    movieId: PropTypes.number,
    user: PropTypes.object
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
)(FavoriteMarkerIcon)
