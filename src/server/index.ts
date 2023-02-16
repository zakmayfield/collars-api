import { ServerContext } from './../types.js';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';

import { PrismaClient } from '@prisma/client';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';

import { resolvers, typeDefs } from './schema/index.js';
import { createContext, API_URL } from '../utils/index.js';

const prisma = new PrismaClient();

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<ServerContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  `/`,
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => await createContext(prisma, req),
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);

console.log(`🚀 Server ready at http://localhost:4000/`);
