const { gql } = require("apollo-server-lambda");

// Construct a schema, using GraphQL schema language

exports.schema = gql`
  scalar JSON

  type Query {
    listMovies(pageNo: Int = 1): PaginatedMovieResult
    movie(id: Int!): Movie
    searchMovie(searchInput: String!, pageNo: Int = 1): PaginatedMovieResult
    login(email: String!, password: String!): AuthData
    listFavoriteMovies(email: String!): [Movie]
  }

  type Mutation {
    signUp(email: String!, password: String!, name: String!): User!
    addMovieToFavorities(email: String!, movieID: Int!): User!
    removeMovieFromFavorities(email: String!, movieID: Int!): User
  }

  type Movie {
    id: Int!
    title: String!
    vote_average: Float
    overview: String!
    poster_path: String!
    isFavorite: Boolean
  }

  type PaginatedMovieResult {
    movies: [Movie]
    page: Int!
    total_pages: Int!
    total_results: Int!
  }

  type User {
    email: String!
    fav_movies: JSON
    name: String!
    password: String!
  }

  type AuthData {
    email: String!
    token: String!
    tokenExpiration: Int!
  }
`;
