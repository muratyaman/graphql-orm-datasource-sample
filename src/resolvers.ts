import * as SchemaGen from './generated';

// define GraphQL resolvers
export const resolvers: SchemaGen.Resolvers = {
  Query: {
    hello: () => 'world',
    trucks: async (parent, args, { dataSources }) => {
      return dataSources.parcelOrm.findTrucks();
    },
    findTruck: async (parent, { id }, { dataSources }) => {
      return dataSources.parcelOrm.findTruck(id);
    },
  },
  Truck: {
    parcels: parent => parent.parcels,
    parcelCount: parent => parent.parcels.length,
  },
  Parcel: {
    weight: parent => parent.weight,
  },
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
  },
};
