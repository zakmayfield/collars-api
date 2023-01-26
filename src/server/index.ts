import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken'
import { resolvers, typeDefs } from './schema/index.js'
import { config } from './config.js';
import { ContextReturn, AgencyContext, UserContext } from './types/index.js'


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
          const db = prisma;
          // let agency: AgencyContext = {
          //     id: 1,
          //     email: 'pawsandclaws@gmail.com',
          //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwYXdzYW5kY2xhd3NAZ21haWwuY29tIiwiaWF0IjoxNjczNzI3ODU5LCJleHAiOjE2NzM5MDA2NTl9.aLqXWpro7j1B0q5-OAvn8AuaRCY6YOgDfbu8_nZekAA'
          // }
          let agency: AgencyContext = null;
          let user: UserContext = null;
          let token: string = req?.headers?.authorization
            ? req?.headers?.authorization.split(' ')[1]
            : '';

          if (token) {
            if (token.includes('"')) {
              token = token.split('"')[0];
            }

            const { id, email } = jwt.verify(token, config.APP_SECRET);

            agency = {
              id,
              email,
              token,
            };
          }

          // console.log('::: agency ctx :::', agency);

          return {
            req,
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
