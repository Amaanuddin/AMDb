import React, { useState } from 'react';
import SearchBar from "../searchbar";
import MovieWall from "../movieWall";
import MovieCard from "../movieCard";
import LoadMoreBtn from "../loadMoreButton";
import NoImage from '../../assets/no_image.jpg'
import Loading from '../common/loading';
import { useHomeFetch } from '../hooks/custom/useHomeFetch';
const FavoriteMovies = props => {
  const [searchTerm, setSearchTerm] = useState("");
  const [
    {
      state: { movies, currentPage, totalPages, favMovies },
      loading,
      error,
    },
    fetchMovies,
  ] = useHomeFetch(searchTerm);

  const searchMovies = (search) => {
    setSearchTerm(search);
    fetchMovies(search);
  };

  const loadMoreMovies = () => {
     searchTerm ? fetchMovies(searchTerm,  currentPage + 1) : fetchMovies('',  currentPage + 1);

  };
  console.log(process.env.REACT_APP_IMAGE_BASE_URL + process.env.REACT_APP_POSTER_SIZE);
  if (error) return <div>Something went wrong ...</div>;
  if (!movies[0]) return <Loading />;
    return (
      <>
        <SearchBar callback={searchMovies} />

        <MovieWall header={searchTerm ? "Search Result" : "Popular Movies"}>
          {movies.map((movie) => (
            <>
              <MovieCard
                key={movie.id}
                clickable
                image={
                  movie.poster_path
                    ? process.env.REACT_APP_IMAGE_BASE_URL + process.env.REACT_APP_POSTER_SIZE + movie.poster_path
                    : NoImage
                }
                movie={movie}
                favMovie={favMovies && favMovies.some((fm) => { console.log(fm.id === movie.id); return fm.id === movie.id})}
              />
            </>
          ))}
        </MovieWall>
        {loading && <Loading />}
        {currentPage < totalPages && !loading && (
          <LoadMoreBtn text="Load more..." callback={loadMoreMovies} />
        )}
      </>
    );
    
};

export default FavoriteMovies;