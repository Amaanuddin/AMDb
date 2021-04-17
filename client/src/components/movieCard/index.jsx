import React, { useState } from "react";
import PropTypes from "prop-types";

// Components
import Modal from "../movieModal";
import MovieDetails from "../movieDetails";

// Styled Components
import { StyledMovieCard } from "./styles";
import FavoriteIcon from "./favoriteIcon";

const MovieCard = (props) => {
  const { image, movie, clickable, favMovie, movieId } = props
  const [isModal, setModal] = useState(false);
    
  return (
    <StyledMovieCard>
      <>
        <Modal isVisible={isModal} onClose={() => setModal(false)}>
          <MovieDetails movie={movie} favMovie={favMovie}/>
        </Modal>
        {clickable ? (
            <>
                <FavoriteIcon movieId={movie.id} favMovie={favMovie} />
                <img
                    className="clickable"
                    src={image}
                    alt="moviecard"
                    onClick={() => setModal(true)}
                    
                />
                <div className="card-rating" >
                    <div>{movie.vote_average}</div>
                </div>
          </>
              ) : (
                    <>
                        <FavoriteIcon movieId={movieId} favMovie={favMovie} />
                        <img src={image} alt="moviecard" />
                    </>
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

export default MovieCard;
