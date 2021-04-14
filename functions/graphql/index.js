
const { ApolloServer } = require('apollo-server-lambda');
const { resolvers } = require('./resolvers');
const { schema } = require('./schema');

const server = new ApolloServer({
  typeDefs:schema,
  resolvers
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  }
});