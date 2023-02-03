import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { resolvers, typeDefs } from './schema/index.js';
import { config } from './config.js';
import { ContextReturn, AgencyContext } from './types/index.js';

const app = express();
const prisma = new PrismaClient();
const httpServer = http.createServer(app);

const server = new ApolloServer<ContextReturn>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/',
  cors<cors.CorsRequest>(),
  bodyParser.json({ limit: '50mb' }),
  expressMiddleware(server, {
    context: async ({ req }) => {
      // let agency: AgencyContext = { // for testing
      //   id: 1,
      //   email: 'agency-1@email.com',
      //   token:
      //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZ2VuY3ktMUBlbWFpbC5jb20iLCJpYXQiOjE2NzQ3NDYyNDMsImV4cCI6MTY3NzMzODI0M30.hqLpAdqZWuNKz3oo0FnI4Hk0OwPCbFnbLPsM89KPlWE',
      // };

      const db = prisma;
      let agency: AgencyContext = null;

      let token: string = req?.headers?.authorization
        ? req?.headers?.authorization.split(' ')[1]
        : '';

      if (token) {
        // if (token.includes('"')) { 
        //   // safeguarding against a strange bug that adds a " to the end of the token
        //   token = token.split('"')[0];
        // }

        // console.log('::: token ctx :::', token);

        const { id, email } = jwt.verify(token, config.APP_SECRET);

        agency = {
          id,
          email,
          token,
        };
      }

      return {
        db,
        agency,
      };
    },
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/`);
