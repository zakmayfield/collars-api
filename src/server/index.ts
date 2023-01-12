import * as dotenv from 'dotenv';
import { AgencyContext, UserContext } from './../types/index';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const { Query } = require('./resolvers/Query')
const { Mutation } = require('./resolvers/Mutation')
// import { typeDefs } from './typeDefs';
const config = require('./config')
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

const typeDefs = `#graphql
    type Query {
        getPets: [Pet!]!
        getAgencies: [Agency!]!
        getAgencyById(id: ID!): Agency!
        getAgency: Agency!
    }

    type Mutation {
        registerAgency(input: RegisterAgency!): Agency!
        loginAgency(input: LoginAgency!): Agency!
    }

    input RegisterAgency {
        name: String!
        email: String!
        password: String!
    }

    input LoginAgency {
        email: String!
        password: String!
    }




    # ::: address :::
    type Address { 
        id: ID!
        createdAt: String
        updatedAt: String

        address: String!
        apartment: String
        city: String!
        state: String!
        zip: Int!
        country: String!
        
        agencyProfile: AgencyProfile
        userProfile: UserProfile

        agencyProfileId: Int
        userProfileId: Int
    }




    # ::: contact :::
    type Contact {
        id: ID!
        createdAt: String
        updatedAt: String

        phone: String
        email: String

        agencyProfile: AgencyProfile
        userProfile: UserProfile

        agencyProfileId: Int
        volunteerProfileId: Int
    }




    # ::: agency :::
    type Agency {
        id: ID!
        createdAt: String
        updatedAt: String

        name: String!
        email: String!
        password: String!
        token: String

        profile: AgencyProfile
        pets: [Pet]!
        volunteers: [User]!
    }

    type AgencyProfile {
        id: ID!
        createdAt: String
        updatedAt: String

        username: String!
        bio: String
        
        contacts: [Contact]!
        addresses: [Address]!

        agency: Agency!
        agencyId: Int!
    }




    # ::: user :::
    type User {
        id: ID!
        createdAt: String
        updatedAt: String

        username: String!
        email: String!
        password: String!
        role: String!
        token: String

        profile: UserProfile
        agency: Agency
        savedPets: [UsersToPets]!

        agencyId: Int
    }

    type UserProfile {
        id: ID!
        createdAt: String
        updatedAt: String

        firstName: String
        lastName: String
        bio: String

        contact: Contact
        address: Address

        user: User!
        userId: Int!
    }

    type UsersToPets {
        user: User!
        userId: Int!
        pet: Pet!
        petId: Int!
    }




    # ::: pet :::
    type Pet {
        id: ID!
        createdAt: String
        updatedAt: String

        name: String!
        species: [SpeciesToPets]
        breed: [BreedsToPets]
        savedBy: [UsersToPets]

        profile: PetProfile
        agency: Agency!

        agencyId: Int!
    }

    type PetProfile {
        id: ID!
        createdAt: String
        updatedAt: String

        age: Int
        bio: String
        sex: String
        weight: Int
        birthday: String
        coat: String
        goodWith: String
        personalityType: String
        dietRestrictions: String
        isHouseTrained: Boolean
        isAvailable: Boolean!

        color: [ColorsToPetProfiles]
        images: [ImagesToPetProfiles]

        pet: Pet!
        petId: Int!
    }




    # ::: color :::
    type Color {
        id: ID!
        createdAt: String
        updatedAt: String
       

        color: String!

        pets: [ColorsToPetProfiles]
    }

    type ColorsToPetProfiles {
        color: Color!
        colorId: Int!
        petProfile: PetProfile!
        petProfileId: Int!
    }




    # ::: species :::
    type Species {
        id: ID!
        createdAt: String
        updatedAt: String

        species: String!

        pets: [SpeciesToPets]
    }

    type SpeciesToPets {
        species: Species!
        speciesId: Int!
        pet: Pet!
        petId: Int!
    }





    # ::: breed :::
    type Breed {
        id: ID!
        createdAt: String
        updatedAt: String
       

        breed: String!

        pets: [BreedsToPets]
    }

    type BreedsToPets {
        breed: Breed!
        breedId: Int!
        pet: Pet!
        petId: Int!
    }




    # ::: image :::
    type Image {
        id: ID!
        createdAt: String
        updatedAt: String

        url: String
        file: String
        thumbnail: String

        pets: [ImagesToPetProfiles]
    }

    type ImagesToPetProfiles {
        image: Image!
        imageId: Int!
        petProfile: PetProfile!
        petProfileId: Int!
    }
`;

const app = express()
// const prisma = new PrismaClient();

const httpServer = http.createServer(app)

const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start()

app.use(
  '/',
  cors<cors.CorsRequest>(),
  // 50mb === default
  bodyParser.json({ limit: '50mb' }),
  // similar to startStandAloneServer(server, { ... })
  expressMiddleware(server, {
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
  })
);

// const startServer = async () => {
//   return await new Promise<void>((resolve) =>
//     httpServer.listen({ port: 4000 }, resolve)
//   );
// }

// startServer()


console.log(`🚀 Server ready at http://localhost:4000/`);



/* ::: end expressMiddleware ::: */






// const resolvers = {
//   Query,
//   Mutation,
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// interface ContextReturn {
//   req: any;
//   db: PrismaClient;
//   agency?: AgencyContext | null;
//   user?: UserContext;
// }

// const authenticate = async (resolve, root, args, context, info) => {
//   // const { req } = context;
//   // // check if the user is authenticated here
//   // const user = await authenticateUser(req);
//   // if (!user) {
//   //   throw new AuthenticationError(
//   //     'You must be logged in to access this resource.'
//   //   );
//   // }
//   // // check if the user is authorized here
//   // if (!authorizeUser(user)) {
//   //   throw new ForbiddenError(
//   //     'You do not have permission to access this resource.'
//   //   );
//   // }
//   // // attach the user to the context
//   // context.user = user;
//   return resolve(root, args, context, info);
// };


// startStandaloneServer(server, {
//   context: async ({ req }: { req: any }): Promise<ContextReturn> => {
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
// }).then(({ url }) => console.log(`🚀 Server running at ${url}`));
