import { PrismaClient } from '@prisma/client';
import { JwtPayload, verify } from 'jsonwebtoken';

import { APP_SECRET } from './constants.js';

export async function authenticateUser(prisma: PrismaClient, req: any) {
  const token: string = req?.headers?.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';

  if (!token) return null

  const verifiedToken = verify(token, APP_SECRET) as JwtPayload;

  if (!verifiedToken) return null

  // happy path
  const { userId } = verifiedToken;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  console.log('::: authenticate ::: USER :::', {
    ...user
  })

  return {
    ...user
  };
}
