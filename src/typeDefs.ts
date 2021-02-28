import fs from 'fs';
import path from 'path';
import { gql } from 'apollo-server';

// define GraphQL schema
const schemaText = fs.readFileSync(path.resolve(__dirname, '..', 'schema.gql'));
export const typeDefs = gql`${schemaText}`;
