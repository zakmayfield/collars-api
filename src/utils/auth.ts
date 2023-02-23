import { GraphQLError } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { JwtPayload, verify } from 'jsonwebtoken';

import { APP_SECRET } from './constants.js';

export async function authenticateUser(
  prisma: PrismaClient,
  req: any,
  res: any
) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000/graphql');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const token: string = req?.headers?.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';

  if (!token) {
    return null;
  }

  const verifiedToken = verify(token, APP_SECRET) as JwtPayload;

  if (!verifiedToken) {
    Promise.reject(new GraphQLError(`🚫 Invalid Token`));
    return null;
  }

  // res.setHeader('Set-Cookie', `user=${token}; HttpOnly`);
  
  // happy path
  const { userId } = verifiedToken;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      type: true,
    },
  });

  res.status(201)
  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return {
    ...user,
  };
}
