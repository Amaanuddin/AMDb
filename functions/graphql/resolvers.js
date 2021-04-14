// Provide resolver functions for your schema fields
exports.resolvers = {
  Query: {
    hello: (parent, args, context, info) => {
      return `Hello world!${args.name}}`;
    }
  }
};

