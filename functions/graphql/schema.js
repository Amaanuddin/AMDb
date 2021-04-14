const { gql } = require('apollo-server-lambda');


// Construct a schema, using GraphQL schema language

exports.schema = gql`
  type Query {
    listMovies(pageNo: Int = 1): PaginatedMovieResult
    movie(id: Int!): Movie
    searchMovie(searchInput: String!, pageNo: Int = 1):PaginatedMovieResult
  }

  type Movie {
      id: Int!
      title: String!,
      vote_average: Float,
      overview: String!,
      poster_path: String!
  }

  type PaginatedMovieResult {
      movies: [Movie]
      page: Int!
      total_pages: Int!
      total_results: Int!
  }
`;