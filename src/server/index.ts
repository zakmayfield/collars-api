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
    let token: string;
    let decoded: AgencyContext;
    const db = prisma;

    // check auth headers and decode token if available
    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1].split('"')[0];
      
      const{ id, email} = jwt.verify(token, config.APP_SECRET);

      const agency = {
        id,
        email
      }

      return {
        db,
        agency
      };
    }

    throw new GraphQLError(`🚫 No auth ::: please provide token :::`)
  },
}).then(({ url }) => console.log(`🚀 Server running at ${url}`));
