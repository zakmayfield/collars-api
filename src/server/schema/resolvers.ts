import { GraphQLError } from 'graphql';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// import { Link, Comment } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/index.js';

import {
  ServerContext,
  SignupArgs,
  LoginArgs,
  PostCommentArgs,
  PostLinkArgs,
  UpdateCommentArgs,
  UpdateLinkArgs,
  DeleteUserAccountArgs,
} from '../../types.js';

import {
  applyTakeConstraints,
  applySkipConstraints,
  APP_SECRET,
} from '../../utils/index.js';

export const resolvers = {
  // ::: query :::
  Query: {
    // ::: User :::
    getUser: async (parent: unknown, args: {}, context: ServerContext) => {
      const { user } = context;

      if (!user) return Promise.reject(new GraphQLError(`🚫 Not authenticated.`));

      const userData = context.prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          email: true,
          type: true,
          profile: true,
          pets: true,
          savedPets: true,
          volunteers: true,
        },
      });

      if (!userData)
        return Promise.reject(
          new GraphQLError(`🚫 Coudn't locate that user. Try again.`)
        );

      return userData;
    },
  },

  
  // ::: mutations :::
  Mutation: {
    // ::: User :::
    signUp: async (
      parent: unknown,
      args: SignupArgs,
      context: ServerContext
    ) => {
      // validate args // throw if incomplete data

      const { name, email, password } = args;
      if (!name || !email || !password) {
        return Promise.reject(new GraphQLError(`🚫 All fields are required.`));
      }

      console.log('args', args);

      // check if email exists
      const emailExists = await context.prisma.user.findUnique({
        where: { email },
      });
      if (emailExists) {
        return Promise.reject(new GraphQLError(`🚫 Email is already taken, try again.`));
      }

      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);

      const user = await context.prisma.user.create({
        data: {
          ...args,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, APP_SECRET);

      return { token, user };
    }
  },
};
