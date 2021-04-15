
const { ApolloServer } = require('apollo-server-lambda');
const { isAuth } = require('../../common/isAuth');
const { resolvers } = require('./resolvers');
const { schema } = require('./schema');

const server = new ApolloServer({
  typeDefs:schema,
  resolvers,
  context: ({ event, context }) => {
    const authorization = event.headers.Authorization || '';
   
    const authenticated = isAuth(authorization);
    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      user: authenticated
    }
  }
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true
  }
});