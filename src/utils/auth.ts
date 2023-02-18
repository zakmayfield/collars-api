import { GraphQLError } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { JwtPayload, verify } from 'jsonwebtoken';

import { APP_SECRET } from './constants.js';

export async function authenticateUser(prisma: PrismaClient, req: any) {
  const token: string = req?.headers?.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';

  if (!token) {
    // Promise.reject(new GraphQLError(`🚫 No Token`));
    return null;
  }
  
  
  const verifiedToken = verify(token, APP_SECRET) as JwtPayload;

  if (!verifiedToken) {
    Promise.reject( new GraphQLError(`🚫 Invalid Token`))
    return null
  }

  // happy path
  const { userId } = verifiedToken;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      type: true
    },
  });

  console.log('::: authenticate ::: USER :::', {
    ...user
  })

  return {
    ...user
  };
}
