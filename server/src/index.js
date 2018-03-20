const { GraphQLServer } = require('graphql-yoga');
const express = require('express');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const Feed = require('./resolvers/Feed');
const path = require('path');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Feed
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/thomaschang7-eb182d/hackernews-graphql-js/dev',
      secret: 'mysecret123',
      debug: true
    })
  })
});

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.PORT', process.env.PORT);
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
server.use(staticFiles);
server.use('/*', staticFiles);

server.start(() => console.log('Server is running on '));
