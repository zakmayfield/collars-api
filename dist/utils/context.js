import { authenticateUser } from './auth.js';
export async function createContext(prisma, req) {
    return {
        prisma,
        user: await authenticateUser(prisma, req),
    };
}
