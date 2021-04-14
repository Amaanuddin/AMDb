const { default: axios } = require("axios");
const { Get, Put } = require("../../common/db/dynamo");

  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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
    },
    login: async (parent, args, context, info) => {
      const params = {
            TableName : process.env.USER_TABLE_NAME,
            Key: {
                email: args.email
            }
        };
      const { Item } = await Get(params);
      if (!Item) {
        throw new Error('User not found.');
      }
      const isEqual = await bcrypt.compare(args.password, Item.password);
      if (!isEqual) {
        throw new Error('Password is incorrect!');
      }
        const token = jwt.sign(
      { name: Item.name, email: Item.email },
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }
    );
      return {email: Item.email, token, tokenExpiration: 1};
    }
  },
  Mutation: {
    signUp: async (parent, args, context, info) => {
      const params = {
            TableName : process.env.USER_TABLE_NAME,
            Key: {
                email: args.email
            }
        };
      const { Item } = await Get(params);
      if (Item) {
        throw new Error('User already exist');
      }
      const hashedPassword = await bcrypt.hash(args.password, 12);
      const putParams = {
        TableName: process.env.USER_TABLE_NAME,
        Item: {
          email: args.email,
          password: hashedPassword,
          name: args.name
        }
      }
      try {
        const result = await Put(putParams);
        if(result.$response.data)
          return { email: args.email, password: '', fav_movies: [], name: args.name };
        throw new Error('Something went wrong');
      }
      catch (err) {
        console.log(err);
        return {email: '', password: '', fav_movies: [], name: ''}
      }
    }
  }
};

