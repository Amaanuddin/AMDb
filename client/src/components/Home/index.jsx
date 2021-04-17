import React, { useState } from 'react';
import SearchBar from "../searchbar";
import MovieWall from "../movieWall";
import MovieCard from "../movieCard";
import LoadMoreBtn from "../loadMoreButton";
import NoImage from '../../assets/no_image.jpg'
import Loading from '../common/loading';
import { useHomeFetch } from '../hooks/custom/useHomeFetch';
import { connect } from 'react-redux';
const Home = props => {
  const [searchTerm, setSearchTerm] = useState("");
  const [
    {
      state: { movies, currentPage, totalPages },
      loading,
      error,
    },
    fetchMovies,
  ] = useHomeFetch(searchTerm);
  const { user: { profile } } = props;
  const searchMovies = (search) => {
    setSearchTerm(search);
    fetchMovies(search);
  };

  const loadMoreMovies = () => {
     searchTerm ? fetchMovies(searchTerm,  currentPage + 1) : fetchMovies('',  currentPage + 1);

  };
  if (error) return <div>Something went wrong ...</div>;
  if (!movies[0]) return <Loading />;
    return (
      <>
        <SearchBar callback={searchMovies} />

        <MovieWall header={searchTerm ? "Search Result" : "Popular Movies"}>
          {movies.map((movie) => (
            
              <MovieCard
                key={movie.id}
                clickable
                image={
                  movie.poster_path
                    ? process.env.REACT_APP_IMAGE_BASE_URL + process.env.REACT_APP_POSTER_SIZE + movie.poster_path
                    : NoImage
                }
                movie={movie}
                favMovie={profile && profile.fav_movies && profile.fav_movies[movie.id] ? true: false}
              />
            
          ))}
        </MovieWall>
        {loading && <Loading />}
        {currentPage < totalPages && !loading && (
          <LoadMoreBtn text="Load more..." callback={loadMoreMovies} />
        )}
      </>
    );
    
};
const mapStateToProps = ({ user }) => ({
  user
});

export default connect(
  mapStateToProps
)(Home);