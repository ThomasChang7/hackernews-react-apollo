'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('graphql-yoga'),
    GraphQLServer = _require.GraphQLServer;

var _require2 = require('prisma-binding'),
    Prisma = _require2.Prisma;

var Query = require('./resolvers/Query');
var Mutation = require('./resolvers/Mutation');
var Subscription = require('./resolvers/Subscription');
var Feed = require('./resolvers/Feed');

var resolvers = {
  Query: Query,
  Mutation: Mutation,
  Subscription: Subscription,
  Feed: Feed
};

var server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: resolvers,
  context: function context(req) {
    return (0, _extends3.default)({}, req, {
      db: new Prisma({
        typeDefs: 'src/generated/prisma.graphql',
        endpoint: 'https://us1.prisma.sh/thomaschang7-eb182d/hackernews-graphql-js/dev',
        secret: 'mysecret123',
        debug: true
      })
    });
  }
});

server.start(function () {
  return console.log('Server is running on http://localhost:4000');
});