import { GraphQLError } from 'graphql';
import { APP_SECRET } from './constants';
import { verify } from 'jsonwebtoken';
export async function authenticateUser(prisma, req) {
    const token = req?.headers?.authorization
        ? req.headers.authorization.split(' ')[1]
        : '';
    if (!token)
        return null;
    const verifiedToken = verify(token, APP_SECRET);
    if (!verifiedToken)
        return Promise.reject(new GraphQLError(`Invalid token`));
    const { userId } = verifiedToken;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true
        }
    });
    return {
        ...user,
        token
    };
}
