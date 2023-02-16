import { verify } from 'jsonwebtoken';
import { APP_SECRET } from './constants.js';
export async function authenticateUser(prisma, req) {
    const token = req?.headers?.authorization
        ? req.headers.authorization.split(' ')[1]
        : '';
    if (!token)
        return null;
    const verifiedToken = verify(token, APP_SECRET);
    if (!verifiedToken)
        return null;
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
    });
    return {
        ...user
    };
}
