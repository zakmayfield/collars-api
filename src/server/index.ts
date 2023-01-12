import * as dotenv from 'dotenv';
import { AgencyContext, UserContext } from './../types/index';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Query } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation';
import { typeDefs } from './typeDefs';
import config from './config';
import jwt from 'jsonwebtoken';

import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

interface ContextReturn {
  req: any;
  db: PrismaClient;
  agency?: AgencyContext | null;
  user?: UserContext;
}
const prisma = new PrismaClient();



/* ::: expressMiddleware ::: */



// const app = express()
// const prisma = new PrismaClient();

// const httpServer = http.createServer(app)

// const resolvers = {
//   Query,
//   Mutation,
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });

// const start = async () => await server.start()

// start()

// app.use(
//   '/',
//   cors<cors.CorsRequest>(),
//   // 50mb === default
//   bodyParser.json({ limit: '50mb' }),
//   // similar to startStandAloneServer(server, { ... })
//   expressMiddleware(server, {
//     context: async ({ req }: { req: any }): Promise<ContextReturn> => {
//     const db = prisma;
//     let agency: AgencyContext = null
//     let token: string = req?.headers?.authorization ? req?.headers?.authorization.split(' ')[1] : ''
    

//     if (token) {
//       if (token.includes('"')) {
//         token = token.split('"')[0]
//       }

//       const { id, email} = jwt.verify(token, config.APP_SECRET);
      
//       agency = {
//         id,
//         email,
//         token
//       }
//     }

//     console.log('::: agency ctx :::', agency)

//     return {
//       req,
//       db,
//       agency
//     };
//   },
//   })
// );

// const startServer = async () => {
//   return await new Promise<void>((resolve) =>
//     httpServer.listen({ port: 4000 }, resolve)
//   );
// }

// startServer()


// console.log(`🚀 Server ready at http://localhost:4000/`);



/* ::: end expressMiddleware ::: */






const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

interface ContextReturn {
  req: any;
  db: PrismaClient;
  agency?: AgencyContext | null;
  user?: UserContext;
}

const authenticate = async (resolve, root, args, context, info) => {
  // const { req } = context;
  // // check if the user is authenticated here
  // const user = await authenticateUser(req);
  // if (!user) {
  //   throw new AuthenticationError(
  //     'You must be logged in to access this resource.'
  //   );
  // }
  // // check if the user is authorized here
  // if (!authorizeUser(user)) {
  //   throw new ForbiddenError(
  //     'You do not have permission to access this resource.'
  //   );
  // }
  // // attach the user to the context
  // context.user = user;
  return resolve(root, args, context, info);
};


startStandaloneServer(server, {
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
      req,
      db,
      agency
    };
  },
}).then(({ url }) => console.log(`🚀 Server running at ${url}`));
