const { default: axios } = require("axios");
const { Get, Put, Update } = require("../../common/db/dynamo");

const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-errors");
const { getToken } = require("../../common/getToken");

const MOVIE_BASE_URL = "https://api.themoviedb.org/3/";

// Provide resolver functions for your schema fields
exports.resolvers = {
  Query: {
    listMovies: async (parent, args, context, info) => {
      const movies = await axios.get(
        `${MOVIE_BASE_URL}movie/popular?api_key=${process.env.MOVIES_API_KEY}&page=${args.pageNo}`
      );
      return {
        movies: movies.data.results,
        page: movies.data.page,
        total_pages: movies.data.total_pages,
        total_results: movies.data.total_results,
      };
    },
    movie: async (parent, args, context, info) => {
      const movie = await axios.get(
        `${MOVIE_BASE_URL}movie/${args.id}?api_key=${process.env.MOVIES_API_KEY}`
      );
      return movie.data;
    },
    searchMovie: async (parent, args, context, info) => {
      const movies = await axios.get(
        `${MOVIE_BASE_URL}search/movie?language=en&page=${args.pageNo}&query=${args.searchInput}&api_key=${process.env.MOVIES_API_KEY}`
      );
      return {
        movies: movies.data.results,
        page: movies.data.page,
        total_pages: movies.data.total_pages,
        total_results: movies.data.total_results,
      };
    },
    login: async (parent, args, context, info) => {
      const params = {
        TableName: process.env.USER_TABLE_NAME,
        Key: {
          email: args.email,
        },
      };
      const { Item } = await Get(params);
      if (!Item) {
        throw new Error("User not found.");
      }
      const isEqual = await bcrypt.compare(args.password, Item.password);
      if (!isEqual) {
        throw new Error("Password is incorrect!");
      }
      const token = getToken(Item);
      return { user: { ...Item, password: "" }, token, tokenExpiration: 1 };
    },
    listFavoriteMovies: async (parent, args, context, info) => {
      if (context.user.email !== args.email || !context.user) {
        throw new AuthenticationError("Unauthorized!");
      }
      const params = {
        TableName: process.env.USER_TABLE_NAME,
        Key: {
          email: args.email,
        },
      };
      const { Item } = await Get(params);
      const favMovies = Object.keys(Item.fav_movies).map((id) => {
        return { ...Item.fav_movies[id], id };
      });
      return favMovies;
    },
    getAuthUser: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError("Unauthorized!");
      }
      const params = {
        TableName: process.env.USER_TABLE_NAME,
        Key: {
          email: context.user.email,
        },
      };
      const { Item } = await Get(params);
      const token = getToken(Item);
      return { user: { ...Item, password: "" }, token, tokenExpiration: 1 };
    },
  },
  Mutation: {
    signUp: async (parent, args, context, info) => {
      const params = {
        TableName: process.env.USER_TABLE_NAME,
        Key: {
          email: args.email,
        },
      };
      const { Item } = await Get(params);
      if (Item) {
        throw new Error("User already exist");
      }
      const hashedPassword = await bcrypt.hash(args.password, 12);
      const putParams = {
        TableName: process.env.USER_TABLE_NAME,
        Item: {
          email: args.email,
          password: hashedPassword,
          name: args.name,
          fav_movies: {},
        },
      };
      try {
        const result = await Put(putParams);
        if (result.$response.data)
          return {
            email: args.email,
            password: "",
            fav_movies: {},
            name: args.name,
          };
        throw new Error("Something went wrong");
      } catch (err) {
        return { email: "", password: "", fav_movies: {}, name: "" };
      }
    },
    addMovieToFavorities: async (parent, args, context, info) => {
      if (context.user.email !== args.email || !context.user) {
        throw new AuthenticationError("Unauthorized!");
      }
      const {
        data: { id, title, vote_average, overview, poster_path },
      } = await axios.get(
        `${MOVIE_BASE_URL}movie/${args.movieID}?api_key=${process.env.MOVIES_API_KEY}`
      );
      const movieData = {
        id,
        title,
        vote_average,
        overview,
        poster_path,
        isFavorite: true,
      };
      const params = {
        TableName: process.env.USER_TABLE_NAME,
        Key: {
          email: args.email,
        },
        UpdateExpression: "SET fav_movies.#movieID = :movie",
        ExpressionAttributeNames: {
          "#movieID": args.movieID,
        },
        ExpressionAttributeValues: {
          ":movie": movieData,
        },
        ReturnValues: "ALL_NEW",
      };
      const data = await Update(params);
      return {
        email: data.$response.data.Attributes.email,
        fav_movies: data.$response.data.Attributes.fav_movies,
        name: data.$response.data.Attributes.name,
        password: "",
      };
    },
    removeMovieFromFavorities: async (parent, args, context, info) => {
      if (context.user.email !== args.email || !context.user) {
        throw new AuthenticationError("Unauthorized!");
      }
      const params = {
        TableName: process.env.USER_TABLE_NAME,
        Key: {
          email: args.email,
        },
        UpdateExpression: "Remove fav_movies.#movieID",
        ExpressionAttributeNames: {
          "#movieID": args.movieID,
        },
        ReturnValues: "ALL_NEW",
      };
      const data = await Update(params);
      return {
        email: data.$response.data.Attributes.email,
        fav_movies: data.$response.data.Attributes.fav_movies,
        name: data.$response.data.Attributes.name,
        password: "",
      };
    },
  },
};
