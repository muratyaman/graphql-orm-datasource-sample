# graphql-orm-datasource-sample
Sample repo to show usage of graphql-orm-datasource with Apollo Server, GraphQL and TypeORM

# Check Requirements

We are using Node v14.x, TypeScript, Apollo Server, TypeORM, SQLite3, graphql-orm-datasource

# Install 

```
npm install
```

# Configure

Review/edit `ormconfig.json`.

TODO: use dotenv with `.env` for various settings.

# Prepare Database

```
mkdir temp
touch temp/db.sqlite
npm run migrate
```

To undo changes:

```
npm run rollback
```


## Create new migration (for new tables)

```
npm run typeorm migration:create -- -n MyNewMigration
```

## Create new subscriber (optional)

```
npm run typeorm subscriber:create -- -n MyNewSubscriber
```

# Run

```
npm run start:dev
```

# Build

```
npm run build
```

# Sample ParcelOrm

```typescript
import { GraphqlOrmDataSource } from 'graphql-orm-datasource';
import { Truck } from './entity/Truck';

export class ParcelOrm extends GraphqlOrmDataSource {

  async findTrucks(): Promise<Truck[]> {
    const repo = this.orm.getRepository(Truck);
    return repo.find({ relations: ['parcels'] }); // TODO pass filter criteria
  }

  async findTruck(id: string): Promise<Truck> {
    const repo = this.orm.getRepository(Truck);
    return repo.findOne(id, { relations: ['parcels'] });
  }

}
```

# Sample Apollo Server

Check `src/boot.ts`. Main part looks like this:

```typescript
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
```

# Sample GraphQL schema

```graphql
type Query {
  hello: String!
  trucks: [Truck!]!
  findTruck(id: ID!): Truck!
}

type Truck {
  id: ID!
  reg: String!
  make: String!
  model: String!
  emptyWeight: Float!
  loadedWeight: Float!
  parcels: [Parcel!]!
  parcelCount: Int!
}

type Parcel {
  id: ID!
  weight: Float!
}

type User {
  id: ID!
  username: String!
  firstName: String!
  lastName: String!
  fullName: String!
}
```

# Sample GraphQL queries

To get a list of trucks:

```graphql
query {
  trucks {
    id
    reg
    make
    model
    emptyWeight
    loadedWeight
    parcelCount
  }
}
```

To find a truck with parcels loaded:

```graphql
query findTruck($id: ID!) {
  findTruck(id: $id) {
    reg
    make
    model
    parcels {
      id
      weight
    }
  }
}
```
