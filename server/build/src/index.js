'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GraphQLYoga = require('graphql-yoga');
var express = require('express');
var GraphQLServer = GraphQLYoga.GraphQLServer;

var _require = require('prisma-binding'),
    Prisma = _require.Prisma;

var Query = require('./resolvers/Query');
var Mutation = require('./resolvers/Mutation');
var Subscription = require('./resolvers/Subscription');
var Feed = require('./resolvers/Feed');
var path = require('path');

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

var staticFiles = express.static(path.join(__dirname, '../../client/build'));

console.log(path.join(__dirname, '../../client/build'));

server.express.use(staticFiles);

server.express.set('port', process.env.PORT || 3001);

var options = {
  port: process.env.PORT || 3001
};

server.start(options, function (_ref) {
  var port = _ref.port;
  return console.log('Server started, listening on port ' + port + ' for incoming requests.');
});