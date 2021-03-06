import React from "react";
import PropTypes from "prop-types";

// Components
import MovieCard from "../movieCard";

// Images
import NoImage from "../../assets/no_image.jpg";

// Styled Components
import { StyledMovieDetails } from "./styles";

const MovieDetails = ({ movie, favMovie }) => (
  <StyledMovieDetails backdrop={movie.backdrop_path}>
    <div className="moviedetails-content">
      <div className="moviedetails-thumb">
        <MovieCard
          image={
            movie.poster_path
              ? process.env.REACT_APP_IMAGE_BASE_URL +
                process.env.REACT_APP_POSTER_SIZE +
                movie.poster_path
              : NoImage
          }
          clickable={false}
          movieId={movie.id}
          favMovie={favMovie}
          alt="MovieCard"
        />
      </div>
      <div className="moviedetails-text">
        <h1>{movie.title}</h1>
        <h3>PLOT</h3>
        <p>{movie.overview}</p>

        <div className="rating">
          <div>
            <h3>RATING</h3>
            <div className="score">{movie.vote_average}</div>
          </div>
        </div>
      </div>
    </div>
  </StyledMovieDetails>
);

MovieDetails.propTypes = {
  movie: PropTypes.object,
  favMovie: PropTypes.bool,
};

export default MovieDetails;
