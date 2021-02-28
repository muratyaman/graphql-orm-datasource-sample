import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import { ParcelOrm } from './ParcelOrm';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

async function boot() {

  // create instance of TypeORM connection
  const orm = await createConnection();

  // create instance of our datasource
  const parcelOrm = new ParcelOrm({ orm });

  // create instance of Apollo GraphQL server
  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ parcelOrm }),
    context: () => ({ userId: 'me' }), // TODO
  });

  gqlServer.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

boot();
