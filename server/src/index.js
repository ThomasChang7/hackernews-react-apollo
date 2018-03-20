const GraphQLYoga = require('graphql-yoga');
const { express, GraphQLServer } = GraphQLYoga;
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const Feed = require('./resolvers/Feed');

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

server.express.use(express.static(path.join(__dirname, '../../client/build')));

console.log(process.env.PORT);

const options = {
  port: process.env.PORT || 3001
};

server.start(options, ({ port }) => console.log(`Server started, listening on port ${port} for incoming requests.`));
