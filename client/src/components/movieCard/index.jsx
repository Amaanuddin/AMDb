import React, { useState } from "react";
import PropTypes from "prop-types";

// Components
import Modal from "../movieModal";
import MovieDetails from "../movieDetails";
// import Spinner from "./Spinner";

// Custom Hook
import { useMovieFetch } from "../hooks/custom/useMovieFetch";

// Styled Components
import { StyledMovieCard } from "./styles";
import Loading from "../common/loading";

const MovieCard = ({ image, movieId, clickable }) => {
  const [isModal, setModal] = useState(false);

  const [movie, loading, error] = useMovieFetch(movieId);

  if (error) return <div>Something went wrong ...</div>;
  if (loading) return <Loading />;

  return (
    <StyledMovieCard>
      <>
        <Modal isVisible={isModal} onClose={() => setModal(false)}>
          <MovieDetails movie={movie} />
        </Modal>
        {clickable ? (
          <>
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

export default MovieCard;