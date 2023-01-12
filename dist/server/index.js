"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const client_1 = require("@prisma/client");
const server_1 = require("@apollo/server");
const Query_1 = require("./resolvers/Query");
const Mutation_1 = require("./resolvers/Mutation");
const typeDefs_1 = require("./typeDefs");
const config_1 = __importDefault(require("./config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv.config();
/* ::: expressMiddleware ::: */
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const resolvers = {
    Query: Query_1.Query,
    Mutation: Mutation_1.Mutation,
};
const server = new server_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers,
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
});
// await server.start()
const prisma = new client_1.PrismaClient();
app.use('/', (0, cors_1.default)(), 
// 50mb === default
body_parser_1.default.json({ limit: '50mb' }), 
// similar to startStandAloneServer(server, { ... })
(0, express4_1.expressMiddleware)(server, {
    context: async ({ req }) => {
        const db = prisma;
        let agency = null;
        let token = req?.headers?.authorization ? req?.headers?.authorization.split(' ')[1] : '';
        if (token) {
            if (token.includes('"')) {
                token = token.split('"')[0];
            }
            const { id, email } = jsonwebtoken_1.default.verify(token, config_1.default.APP_SECRET);
            agency = {
                id,
                email,
                token
            };
        }
        console.log('::: agency ctx :::', agency);
        return {
            req,
            db,
            agency
        };
    },
}));
const startServer = async () => {
    return await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
};
startServer();
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
