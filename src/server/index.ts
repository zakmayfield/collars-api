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
    const db = prisma;
    let agency = {};
    let token;
    let decoded;

    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1].split('"')[0] || '';
      decoded = jwt.verify(token, config.APP_SECRET);
    }

    console.log('decoded :::', decoded);

    return { db, agency: decoded };
  },
}).then(({ url }) => console.log(`🚀 Server running at ${url}`));
