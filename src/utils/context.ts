import { PrismaClient } from '@prisma/client';
import { ServerContext } from '../types.js';
import { authenticateUser } from './auth.js';

export async function createContext(
  prisma: PrismaClient,
  req: any
): Promise<ServerContext> {
  return {
    prisma,
    user: await authenticateUser(prisma, req),
  };
}
