import axios from "axios";
import { useState, useEffect } from "react";


export const useHomeFetch = (searchTerm) => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

 const fetchMovies = async (search, pageNo = 1) => {
    setError(false);
    setLoading(true);

    try {
       const request = !search ? {
            query: `
                query {
                    listMovies(pageNo: ${pageNo}){
                        page,
                        total_pages,
                        total_results,
                        movies{
                          id,
                          title,
                          vote_average,
                          overview,
                          poster_path,
                          isFavorite
                        }
                    }
                }
            `
        }: {
            query: `
                query {
                    searchMovie(searchInput: "${search}", pageNo: ${pageNo}){
                        page,
                        total_pages,
                        total_results,
                        movies{
                          id,
                          title,
                          vote_average,
                          overview,
                          poster_path,
                          isFavorite
                        }
                    }
                }
            `
        };
        const result = await axios.post(process.env.REACT_APP_GRAPHQL_ENDPOINT, request);
      const moviesResult = !search ? result.data.data.listMovies : result.data.data.searchMovie;
      setState((prev) => ({
        ...prev,
        movies: !search?[...prev.movies, ...moviesResult.movies]: [...moviesResult.movies],
        currentPage: moviesResult.page,
        totalPages: moviesResult.total_pages
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (sessionStorage.homeState) {
      setState(JSON.parse(sessionStorage.homeState));
      setLoading(false);
    } else {
      fetchMovies('');
    }
  }, []);


  return [{ state, loading, error }, fetchMovies];
};
