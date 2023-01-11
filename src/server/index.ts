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
  agency?: AgencyContext | null;
  user?: UserContext;
}

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }: { req: any }): Promise<ContextReturn> => {
    const db = prisma;
    let agency: AgencyContext = null
    let token: string = req?.headers?.authorization ? req?.headers?.authorization.split(' ')[1] : ''
    

    if (token) {
      if (token.includes('"')) {
        token = token.split('"')[0]
      }

      const { id, email} = jwt.verify(token, config.APP_SECRET);
      
      agency = {
        id,
        email,
        token
      }
    }

    console.log('::: agency ctx :::', agency)

    return {
      db,
      agency
    };
  },
}).then(({ url }) => console.log(`🚀 Server running at ${url}`));
