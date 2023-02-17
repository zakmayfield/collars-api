import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, } from '../../utils/index.js';
export const resolvers = {
    // ::: query :::
    Query: {
        // ::: User :::
        getUser: async (parent, args, context) => {
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
                return Promise.reject(new GraphQLError(`🚫 Coudn't locate that user. Try again.`));
            return userData;
        },
        // // ::: Link :::
        // linkFeed: async (
        //   parent: unknown,
        //   args: { filterNeedle?: string; skip?: number; take?: number },
        //   context: ServerContext
        // ) => {
        //   // // i can now authenticate an operation by adding this guard, i can probably extrapolate this to its own middleware
        //   // if (!context.user)
        //   //   return Promise.reject(
        //   //     new GraphQLError(`🚫 Please login to view this data.`)
        //   //   );
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
    // // ::: link :::
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
        signUp: async (parent, args, context) => {
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
        },
        login: async (parent, args, context) => {
            // validate args
            const { email, password } = args;
            if (!email || !password) {
                return Promise.reject(new GraphQLError(`🚫 All fields are required.`));
            }
            // query requested user
            const user = await context.prisma.user.findUnique({ where: { email } });
            if (!user) {
                return Promise.reject(new GraphQLError(`🚫 That user doesn't seem to exist.`));
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
        deleteUserAccount: async (parent, args, context) => {
            const { user } = context;
            if (!user)
                return Promise.reject(new GraphQLError(`🚫 Please login to perform this action.`));
            // validate args
            const { password } = args;
            if (!password)
                return Promise.reject(new GraphQLError(`🚫 Password is required to delete account.`));
            // query requested user
            const userData = await context.prisma.user.findUnique({
                where: { id: user.id },
            });
            if (!userData)
                Promise.reject(new GraphQLError(`🚫 That user doesn't seem to exist`));
            // validate the password
            const passwordIsValid = await bcrypt.compare(args.password, userData.password);
            if (!passwordIsValid)
                return Promise.reject(new GraphQLError(`🚫 Incorrect credentials.`));
            // delete user
            const deletedUser = await context.prisma.user.delete({
                where: { id: user.id },
            });
            return deletedUser;
        },
        updateUserAccount: async (parent, args, context) => {
            const { user } = context;
            if (!user)
                return Promise.reject(new GraphQLError(`🚫 Please login to perform this action.`));
            const { type } = args;
            const updatedUser = await context.prisma.user.update({
                where: { id: user.id },
                data: {
                    ...args
                }
            });
        },
        // ::: Pet :::
        postPet: async (parent, args, context) => {
            const { user } = context;
            if (!user)
                Promise.reject(new GraphQLError(`🚫 User is not authenticated. Please log in.`));
            if (user.type !== 'AGENCY')
                Promise.reject(new GraphQLError(`🚫 This user does not have the proper authorization to do this.`));
            const { name, species } = args;
            if (!name || !species)
                Promise.reject(new GraphQLError(`🚫 Name and species are required fields when creating a pet.`));
            const newPet = await context.prisma.pet.create({
                data: {
                    name,
                    species,
                    agencyId: user.id,
                },
            });
            return newPet;
        },
        // // ::: Link :::
        // postLink: async (
        //   parent: unknown,
        //   args: PostLinkArgs,
        //   context: ServerContext
        // ) => {
        //   const { user } = context;
        //   if (!user)
        //     return Promise.reject(
        //       new GraphQLError(`🚫 User is not authenticated. Please log in.`)
        //     );
        //   const { description, url } = args;
        //   if (!description || !url)
        //     return Promise.reject(new GraphQLError(`🚫 All fields are required.`));
        //   const newLink: Link = await context.prisma.link.create({
        //     data: {
        //       description,
        //       url,
        //       postedById: user.id,
        //     },
        //   });
        //   return newLink;
        // },
        // deleteLink: async (
        //   parent: unknown,
        //   args: { id: number },
        //   context: ServerContext
        // ) => {
        //   const { user } = context;
        //   const { id } = args;
        //   const linkToDelete = await context.prisma.link.findUnique({
        //     where: { id },
        //   });
        //   if (!linkToDelete) {
        //     return Promise.reject(
        //       new GraphQLError(`Link with ID: '${id}' does not exist.`)
        //     );
        //   }
        //   if (linkToDelete.postedById !== user.id) {
        //     return Promise.reject(
        //       new GraphQLError(
        //         `User with ID: '${user.id}' did not create link with ID ${linkToDelete.id}`
        //       )
        //     );
        //   }
        //   const deletedLink = await context.prisma.link
        //     .delete({
        //       where: { id },
        //     })
        //     .catch((err: unknown) => {
        //       if (
        //         err instanceof PrismaClientKnownRequestError &&
        //         err.code === 'P2003'
        //       ) {
        //         return Promise.reject(
        //           new GraphQLError(
        //             `Cannot delete non-existing link with id '${id}'.`
        //           )
        //         );
        //       }
        //       return Promise.reject(err);
        //     });
        //   return deletedLink;
        // },
        // updateLink: async (
        //   parent: unknown,
        //   args: UpdateLinkArgs,
        //   context: ServerContext
        // ) => {
        //   const { user } = context;
        //   const { id, description, url } = args;
        //   const linkToUpdate = await context.prisma.link.findUnique({
        //     where: { id },
        //   });
        //   if (!linkToUpdate) {
        //     return Promise.reject(
        //       new GraphQLError(`Link with ID: '${id}' does not exist.`)
        //     );
        //   }
        //   if (linkToUpdate.postedById !== user.id) {
        //     return Promise.reject(
        //       new GraphQLError(
        //         `User with ID: '${user.id}' did not create link with ID ${linkToUpdate.id}`
        //       )
        //     );
        //   }
        //   const updatedLink = await context.prisma.link
        //     .update({
        //       where: { id },
        //       data: {
        //         description,
        //         url,
        //       },
        //     })
        //     .catch((err: unknown) => {
        //       if (
        //         err instanceof PrismaClientKnownRequestError &&
        //         err.code === 'P2003'
        //       ) {
        //         return Promise.reject(
        //           new GraphQLError(
        //             `Cannot delete non-existing link with id '${id}'.`
        //           )
        //         );
        //       }
        //       return Promise.reject(err);
        //     });
        //   return updatedLink;
        // },
        // // ::: Comment :::
        // postCommentOnLink: async (
        //   parent: unknown,
        //   args: PostCommentArgs,
        //   context: ServerContext
        // ) => {
        //   const { user } = context;
        //   const { body, linkId } = args;
        //   const linkToPostCommentOn = await context.prisma.link.findUnique({
        //     where: { id: linkId },
        //   });
        //   if (!linkToPostCommentOn)
        //     return Promise.reject(
        //       new GraphQLError(`Link with ID: '${linkId}' does not exist.`)
        //     );
        //   if (!body)
        //     return Promise.reject(new GraphQLError(`🚫 Body is a required field`));
        //   const newComment: Comment = await context.prisma.comment
        //     .create({
        //       data: {
        //         body,
        //         linkId,
        //         postedById: user.id,
        //       },
        //     })
        //     .catch((err: unknown) => {
        //       if (
        //         err instanceof PrismaClientKnownRequestError &&
        //         err.code === 'P2003'
        //       ) {
        //         return Promise.reject(
        //           new GraphQLError(
        //             `Cannot post comment on non-existing link with id '${linkId}'.`
        //           )
        //         );
        //       }
        //       return Promise.reject(err);
        //     });
        //   return newComment;
        // },
        // deleteCommentOnLink: async (
        //   parent: unknown,
        //   args: { commentId: number },
        //   context: ServerContext
        // ) => {
        //   const { user } = context;
        //   const { commentId } = args;
        //   const commentToDelete = await context.prisma.comment.findUnique({
        //     where: { id: commentId },
        //   });
        //   if (!commentToDelete) {
        //     return Promise.reject(
        //       new GraphQLError(`Comment with ID: '${commentId}' does not exist.`)
        //     );
        //   }
        //   if (commentToDelete.postedById !== user.id) {
        //     return Promise.reject(
        //       new GraphQLError(
        //         `User with ID: '${user.id}' did not author comment with ID ${commentToDelete.id}`
        //       )
        //     );
        //   }
        //   const deletedComment: Comment = await context.prisma.comment
        //     .delete({
        //       where: { id: commentId },
        //     })
        //     .catch((err: unknown) => {
        //       if (
        //         err instanceof PrismaClientKnownRequestError &&
        //         err.code === 'P2003'
        //       ) {
        //         return Promise.reject(
        //           new GraphQLError(
        //             `Cannot delete a non-existing comment with id '${commentId}'.`
        //           )
        //         );
        //       }
        //       return Promise.reject(err);
        //     });
        //   return deletedComment;
        // },
        // updateCommentOnLink: async (
        //   parent: unknown,
        //   args: UpdateCommentArgs,
        //   context: ServerContext
        // ) => {
        //   const { user } = context;
        //   const { commentId, body } = args;
        //   const commentToUpdate = await context.prisma.comment.findUnique({
        //     where: { id: commentId },
        //   });
        //   if (!commentToUpdate) {
        //     return Promise.reject(
        //       new GraphQLError(`Comment with ID: '${commentId}' does not exist.`)
        //     );
        //   }
        //   if (commentToUpdate.postedById !== user.id) {
        //     return Promise.reject(
        //       new GraphQLError(
        //         `User with ID: '${user.id}' did not author comment with ID ${commentToUpdate.id}`
        //       )
        //     );
        //   }
        //   const updatedComment: Comment = await context.prisma.comment
        //     .update({
        //       where: { id: commentId },
        //       data: {
        //         body,
        //       },
        //     })
        //     .catch((err: unknown) => {
        //       if (
        //         err instanceof PrismaClientKnownRequestError &&
        //         err.code === 'P2003'
        //       ) {
        //         return Promise.reject(
        //           new GraphQLError(
        //             `Cannot post comment on non-existing link with id '${commentId}'.`
        //           )
        //         );
        //       }
        //       return Promise.reject(err);
        //     });
        //   return updatedComment;
        // },
    },
};
