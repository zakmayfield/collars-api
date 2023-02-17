import { GraphQLError } from 'graphql';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// import { Link, Comment } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/index.js';

import {
  ServerContext,
  SignupArgs,
  LoginArgs,
  DeleteUserAccountArgs,
  UpdateUserAccountArgs,
  PostPetArgs,
} from '../../types.js';

import {
  applyTakeConstraints,
  applySkipConstraints,
  APP_SECRET,
} from '../../utils/index.js';
import { Pet } from '@prisma/client';

export const resolvers = {
  // ::: query :::
  Query: {
    // ::: Breed :::
    getBreeds: async (
      parent: unknown,
      args: { filterNeedle?: string; skip?: number; take?: number },
      context: ServerContext
    ) => {

      const where = args.filterNeedle
        ? {
            OR: [
              {
                breed: {
                  contains: args.filterNeedle.toLowerCase(),
                },
              },
            ],
          }
        : {};

      const take = applyTakeConstraints({
        min: 1,
        max: 50,
        value: args.take ?? 30,
      });

      const skip = applySkipConstraints({
        min: 0,
        max: 50,
        value: args.skip ?? 0,
      });

      const breeds = context.prisma.breed.findMany({
        where,
        skip,
        take
      });

      if (!breeds)
        return Promise.reject(
          new GraphQLError(`🚫 Server error, couldn't locate breeds.`)
        );

      return breeds;
    },

    // ::: User :::
    getUser: async (parent: unknown, args: {}, context: ServerContext) => {
      const { user } = context;

      if (!user)
        return Promise.reject(new GraphQLError(`🚫 Not authenticated.`));

      const userData = context.prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          email: true,
          type: true,
          profile: true,
          savedPets: true,
          volunteers: true,
          pets: {
            include: {
              breed: {
                include: {
                  breed: true,
                  pet: true,
                },
              },
            },
          },
        },
      });

      if (!userData)
        return Promise.reject(
          new GraphQLError(`🚫 Coudn't locate that user. Try again.`)
        );

      return userData;
    },

    // // ::: Link :::
    // linkFeed: async (
    //   parent: unknown,
    //   args: { filterNeedle?: string; skip?: number; take?: number },
    //   context: ServerContext
    // ) => {

    //   /* Regarding filterNeedle
    //     filterNeedle is a pretty powerful tool to utilize, this is allowing us to search our Link model based on a condition of similar characters. We can specify which rows we want to filter against, in this case below we are filtering against both properties, description and url. If we change this to just check description then any matchings against url wont register
    //   */

    //   // note * consider making enums for available pagination min and max amounts ect

    //   const where = args.filterNeedle
    //     ? {
    //         OR: [
    //           { description: { contains: args.filterNeedle } },
    //           { url: { contains: args.filterNeedle } },
    //         ],
    //       }
    //     : {};

    //   const take = applyTakeConstraints({
    //     min: 1,
    //     max: 50,
    //     value: args.take ?? 30,
    //   });

    //   const skip = applySkipConstraints({
    //     min: 0,
    //     max: 50,
    //     value: args.skip ?? 0,
    //   });

    //   const linkFeed = await context.prisma.link.findMany({
    //     where,
    //     // take: number of items to take from the list
    //     take,
    //     // start at after x amount of indexes i.e. skip first 10
    //     skip,
    //   });

    //   if (linkFeed.length < 1) {
    //     return Promise.reject(
    //       new GraphQLError(`🚫 Nothing available, try adding some links.`)
    //     );
    //   }

    //   return linkFeed;
    // },
    // link: async (
    //   parent: unknown,
    //   args: { id: number },
    //   context: ServerContext
    // ) => {
    //   const { id } = args;

    //   const link = await context.prisma.link.findUnique({
    //     where: { id },
    //   });

    //   return link;
    // },
    // linkComments: async (
    //   parent: unknown,
    //   args: { linkId: string },
    //   context: ServerContext
    // ) => {
    //   const { linkId } = args;

    //   const linkComments = await context.prisma.link.findUnique({
    //     where: { id: Number(linkId) },
    //   });

    //   return linkComments;
    // },

    // // ::: Comment :::
    // comment: async (
    //   parent: unknown,
    //   args: { id: number },
    //   context: ServerContext
    // ) => {
    //   const { id } = args;

    //   const comment = await context.prisma.comment.findUnique({
    //     where: { id },
    //   });

    //   return comment;
    // },
  },

  // /* Regarding Link & Comment below:
  //   Link and Comment is pretty sweet - when hitting a query for our Link model we are allowing the client to also query the available comments on the Link, but in a separate query. This means the top level query of Link can succeed but the sub query of comments on the same query can fail, meaning we still have access to the top level of our data { ...link ✅  | comments 🚫 }. This means our UI can support data on multiple levels allowing us to avoid error bubbling and crashing our whole application. For instance a page with several sub tabs, the lowest sub tab can fail on the query but the rest of the data will load fine because the query didn't fail as a whole, only on comments
  // */
  // Link: {
  //   comments: async (parent: Link, args: {}, context: ServerContext) => {
  //     return await context.prisma.comment.findMany({
  //       where: { linkId: parent.id },
  //     });
  //   },

  //   postedBy: async (parent: Link, args: {}, context: ServerContext) => {
  //     return await context.prisma.user.findUnique({
  //       where: { id: parent.postedById },
  //     });
  //   },
  // },

  // Comment: {
  //   link: async (parent: Comment, args: {}, context: ServerContext) => {
  //     const { linkId } = parent;

  //     return await context.prisma.link.findUnique({
  //       where: { id: Number(linkId) },
  //     });
  //   },

  //   postedBy: async (parent: Comment, args: {}, context: ServerContext) => {
  //     return await context.prisma.user.findUnique({
  //       where: { id: parent.postedById },
  //     });
  //   },
  // },

  // ::: mutations :::
  Mutation: {
    // ::: User :::
    signUp: async (
      parent: unknown,
      args: SignupArgs,
      context: ServerContext
    ) => {
      // validate args // throw if incomplete data

      const { name, email, username, password } = args;
      if (!name || !email || !password) {
        return Promise.reject(new GraphQLError(`🚫 All fields are required.`));
      }

      const emailExists = await context.prisma.user.findUnique({
        where: { email },
      });

      let usernameExists;

      if (username) {
        usernameExists = await context.prisma.user.findUnique({
          where: { username },
        });
      }

      if (emailExists) {
        return Promise.reject(
          new GraphQLError(`🚫 Email is already taken, try another.`)
        );
      }
      
      if (usernameExists) {
        return Promise.reject(
          new GraphQLError(`🚫 Username is already taken, try another.`)
        );
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
    },
    login: async (parent: unknown, args: LoginArgs, context: ServerContext) => {
      // validate args
      const { email, password } = args;
      if (!email || !password) {
        return Promise.reject(new GraphQLError(`🚫 All fields are required.`));
      }

      // query requested user
      const user = await context.prisma.user.findUnique({ where: { email } });
      if (!user) {
        return Promise.reject(
          new GraphQLError(`🚫 That user doesn't seem to exist.`)
        );
      }

      // validate the password
      const validPassword = await bcrypt.compare(args.password, user.password);
      if (!validPassword) {
        return Promise.reject(new GraphQLError(`🚫 Incorrect credentials.`));
      }

      // generate a token
      const token = jwt.sign({ userId: user.id }, APP_SECRET);

      return { user, token };
    },
    deleteUserAccount: async (
      parent: unknown,
      args: DeleteUserAccountArgs,
      context: ServerContext
    ) => {
      const { user } = context;
      if (!user)
        return Promise.reject(
          new GraphQLError(`🚫 Please login to perform this action.`)
        );

      // validate args
      const { password } = args;
      if (!password)
        return Promise.reject(
          new GraphQLError(`🚫 Password is required to delete account.`)
        );

      // query requested user
      const userData = await context.prisma.user.findUnique({
        where: { id: user.id },
      });

      if (!userData)
        return Promise.reject(
          new GraphQLError(`🚫 That user doesn't seem to exist`)
        );

      // validate the password
      const passwordIsValid = await bcrypt.compare(
        args.password,
        userData.password
      );
      if (!passwordIsValid)
        return Promise.reject(new GraphQLError(`🚫 Incorrect credentials.`));

      // delete user
      const deletedUser = await context.prisma.user.delete({
        where: { id: user.id },
      });

      return deletedUser;
    },
    updateUserAccount: async (
      parent: unknown,
      args: UpdateUserAccountArgs,
      context: ServerContext
    ) => {
      const { user } = context;
      if (!user)
        return Promise.reject(
          new GraphQLError(`🚫 Please login to perform this action.`)
        );

      const { type } = args;

      const updatedUser = await context.prisma.user.update({
        where: { id: user.id },
        data: {
          ...args,
        },
      });

      return updatedUser;
    },

    // ::: Pet :::
    postPet: async (
      parent: unknown,
      args: PostPetArgs,
      context: ServerContext
    ) => {
      const { user } = context;
      if (!user)
        return Promise.reject(
          new GraphQLError(`🚫 User is not authenticated. Please log in.`)
        );

      if (user.type !== 'AGENCY')
        return Promise.reject(
          new GraphQLError(
            `🚫 This user does not have the proper authorization to do this.`
          )
        );

      const { name, species } = args;

      if (!name || !species)
        return Promise.reject(
          new GraphQLError(
            `🚫 Name and species are required fields when creating a pet.`
          )
        );

      const newPet: Pet = await context.prisma.pet.create({
        data: {
          name,
          species,
          agencyId: user.id,
        },
      });

      return newPet;
    },
    deletePet: async (
      parent: unknown,
      args: { id: string },
      context: ServerContext
    ) => {
      const { user } = context;
      const { id } = args;
      if (!user)
        return Promise.reject(
          new GraphQLError(`🚫 User is not authenticated. Please log in.`)
        );

      const petToDelete = await context.prisma.pet.findUnique({
        where: { id },
      });

      if (petToDelete.agencyId !== user.id)
        return Promise.reject(
          new GraphQLError(
            `🚫 User: ${user.id} does not have permission to delete pet with id: ${petToDelete.id}`
          )
        );

      const deletedPet = await context.prisma.pet.delete({
        where: { id },
      });

      return deletedPet;
    },
    addBreedToPet: async (
      parent: unknown,
      args: { petId: string; breedId: string },
      context: ServerContext
    ) => {
      const { user } = context;
      const { petId, breedId } = args;
      if (!user)
        return Promise.reject(
          new GraphQLError(`🚫 User is not authenticated. Please log in.`)
        );

      const newBreedOnPet = await context.prisma.breedsToPets.create({
        data: {
          petId,
          breedId,
        },
      });

      if (!newBreedOnPet)
        return Promise.reject(
          new GraphQLError(`🚫 Something went wrong ::: addBreedToPet`)
        );

      const petWithNewBreed = await context.prisma.pet.findUnique({
        where: { id: petId },
        select: {
          id: true,
          name: true,
          species: true,
          breed: {
            include: {
              breed: true,
            },
          },
        },
      });

      if (!petWithNewBreed)
        return Promise.reject(new GraphQLError(`🚫 Couldn't locate that pet.`));

      return petWithNewBreed;
    },
  },
};
