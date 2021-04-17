import axios from "axios";
import { useState, useEffect, useCallback } from "react";


export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setError(false);
    setLoading(true);

    try {
      const request = {
            query: `
                query {
                    movie(id: ${movieId}){
                        id
                        title
                        vote_average,
                        overview
                        poster_path
                        isFavorite
                    }
                }
            `
        };
      const result = await axios.post(process.env.REACT_APP_GRAPHQL_ENDPOINT, request);

      setState(result.data.data.movie);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [movieId]);

  useEffect(() => {
    if (localStorage[movieId]) {
      if (state.isFavorite !== JSON.parse(localStorage[movieId]).isFavorite) {
        fetchData();
      }
      else {
        setState(JSON.parse(localStorage[movieId]));
        setLoading(false);
      }
    } else {
      fetchData();
    }
  }, [fetchData, movieId, state]);

  useEffect(() => {
    localStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state]);

  return [state, loading, error];
};
