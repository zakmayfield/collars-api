import { Query } from './resolvers/Query.js';
import { Mutation } from './resolvers/Mutation.js';
import { typeDefs } from './typeDefs.js';
const resolvers = {
    Query,
    Mutation
};
export { resolvers, typeDefs };
