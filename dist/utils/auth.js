import { GraphQLError } from 'graphql';
import { verify } from 'jsonwebtoken';
import { APP_SECRET } from './constants.js';
export async function authenticateUser(prisma, req) {
    const token = req?.headers?.authorization
        ? req.headers.authorization.split(' ')[1]
        : '';
    if (!token) {
        // Promise.reject(new GraphQLError(`🚫 No Token`));
        return null;
    }
    const verifiedToken = verify(token, APP_SECRET);
    if (!verifiedToken) {
        Promise.reject(new GraphQLError(`🚫 Invalid Token`));
        return null;
    }
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
