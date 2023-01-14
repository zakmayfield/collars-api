import { PrismaClient } from '@prisma/client';

interface ContextReturn {
  req: any;
  db: PrismaClient;
  agency?: AgencyContext | null;
  user?: UserContext | null;
}

interface AgencyContext {
  id: number;
  email: string;
  token?: string;
}

interface UserContext {
  id: number;
  email: string;
  token?: string;
}

export { ContextReturn, AgencyContext, UserContext };
