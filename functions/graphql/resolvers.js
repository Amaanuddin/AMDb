const { default: axios } = require("axios");

const MOVIE_BASE_URL = "https://api.themoviedb.org/3/"

// Provide resolver functions for your schema fields
exports.resolvers = {
  Query: {
    listMovies: async (parent, args, context, info) => {
      const movies = await axios.get(`${MOVIE_BASE_URL}movie/popular?api_key=${process.env.MOVIES_API_KEY}&page=${args.pageNo}`);
      console.log(movies)
       return {
        movies: movies.data.results,
        page: movies.data.page,
        total_pages: movies.data.total_pages,
        total_results: movies.data.total_results
      };
    },
    movie: async (parent, args, context, info) => {
      const movie = await axios.get(`${MOVIE_BASE_URL}movie/${args.id}?api_key=${process.env.MOVIES_API_KEY}`);
      console.log(movie)
      return movie.data;
    },
    searchMovie: async (parent, args, context, info) => {
       const movies = await axios.get(`${MOVIE_BASE_URL}search/movie?language=en&page=${args.pageNo}&query=${args.searchInput}&api_key=${process.env.MOVIES_API_KEY}`);
      console.log(movies)
      return {
        movies: movies.data.results,
        page: movies.data.page,
        total_pages: movies.data.total_pages,
        total_results: movies.data.total_results
      };
    }
  }
};

