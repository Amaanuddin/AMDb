const { gql } = require('apollo-server-lambda');


// Construct a schema, using GraphQL schema language

exports.schema = gql`
  type Query {
    hello(name: String): String
  }
`;