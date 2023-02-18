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


  // I have a delima here:

  // Two routes to go: the one shown below, grab userId from the verified token then make a call to our db to grab our user
  // or the second route: to set the data to the token upon login or sign up
  // for example `const { userId, name, username, email, type } = verifiedToken`

  // would it be more efficient to go the token route to save us from hitting out db EVERY time we need to authenticate, which could be most of the browsing a user will do on the collars site?

  // resolution is that JWTs are not secure, so any info stored on a JWT is fair game for viewers, this means storing a users sensitive data, such as an email, wouldn't be smart. For security and privacy reasons hitting our db to grab the user is best. We can rely on caching to ensure that the authenticateUser function is only running the findUnique user method if it is different than the cache, not sure how to do this. gotta look into it.

  // happy path
  const { userId } = verifiedToken;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      type: true
    },
  });
  return {
    ...user
  };
}
