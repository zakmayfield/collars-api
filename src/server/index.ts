import { AgencyContext, UserContext } from './../types/index';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Query } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation';
import { typeDefs } from './typeDefs';
import config from './config';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { GraphQLError } from 'graphql';

dotenv.config();

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

interface ContextReturn {
  db: PrismaClient;
  agency?: AgencyContext;
  user?: UserContext;
}

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }: { req: any }): Promise<ContextReturn> => {
    // variables
    let token;
    let decoded;
    const agency = {}
    const db = prisma;

    // check auth headers and decode token if available
    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1].split('"')[0];
      console.log('token', token)
      // decoded = jwt.verify(token, config.APP_SECRET);

      // const { id, email, type, role } = decoded;

      return { db, agency: { id: 0, email: '', type: '', role: '', iat: 0, exp: 0} };
    } 
  },
}).then(({ url }) => console.log(`🚀 Server running at ${url}`));
