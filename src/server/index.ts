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
  agency?: any;
  user?: any;
}

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }: { req: any }): Promise<ContextReturn> => {
    const db = prisma;
    let agency = {};
    let token;

    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1] || '';
      const { id, type } = await jwt.verify(token, config.APP_SECRET);
    }

    console.log('::: token :::', agency ? agency : 'no agency');

    return { db, agency };
  },
}).then(({ url }) => console.log(`🚀 Server running at ${url}`));
