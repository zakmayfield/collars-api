import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';
// import { Link, Comment, UserProfile } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/index.js';
import { applyTakeConstraints, applySkipConstraints, generateToken, } from '../../utils/index.js';
export const resolvers = {
    // ::: query :::
    Query: {
        // ::: Breed :::
        getBreeds: async (parent, args, context) => {
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
            const breeds = context.prisma.breed.findMany({
                where,
            });
            if (!breeds)
                return Promise.reject(new GraphQLError(`🚫 Server error, couldn't locate breeds.`));
            return breeds;
        },
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
                    username: true,
                    email: true,
                    type: true,
                    profile: true,
                    savedPets: true,
                    volunteers: true,
                    pets: true,
                },
            });
            if (!userData)
                return Promise.reject(new GraphQLError(`🚫 Coudn't locate that user. Try again.`));
            return userData;
        },
        // ::: Pet :::
        petFeed: async (
        // public
        parent, args, context) => {
            const where = args.filterNeedle
                ? {
                    OR: [
                        {
                            name: {
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
            const pets = context.prisma.pet.findMany({
                where,
                take,
                skip,
                include: {
                    breed: true,
                    savedBy: true,
                    agency: true,
                },
            });
            return pets;
        },
    },
    Pet: {
        breed: async (parent, args, context) => {
            return await context.prisma.breedsToPets.findMany({
                where: { petId: parent.id },
                select: { breed: true },
            });
        },
        savedBy: async (parent, args, context) => {
            return await context.prisma.savedPetRecord.findMany({
                where: { petId: parent.id },
                select: { user: true },
            });
        },
        agency: async (parent, args, context) => {
            return await context.prisma.user.findUnique({
                where: { id: parent.agencyId },
            });
        },
    },
    User: {
        savedPets: async (parent, args, context) => {
            const savedPets = await context.prisma.savedPetRecord.findMany({
                where: { userId: parent.id },
                select: { petId: true },
            });
            const petIds = savedPets.map((savedPet) => savedPet.petId);
            const saved = await context.prisma.savedPetRecord.findMany({
                where: {
                    petId: { in: petIds },
                    userId: parent.id,
                },
                select: {
                    pet: true,
                },
            });
            return saved;
        },
        profile: async (parent, args, context) => {
            return await context.prisma.userProfile.findUnique({
                where: { userId: parent.id },
            });
        },
    },
    UserProfile: {
        address: async (parent, args, context) => {
            return await context.prisma.address.findMany({
                where: { userProfileId: parent.id },
            });
        },
        contact: async (parent, args, context) => {
            return await context.prisma.contact.findMany({
                where: { userProfileId: parent.id },
            });
        },
    },
    // ::: mutations :::
    Mutation: {
        // Regarding client fetchPolicy
        // Ensure that the requests being made on `login` & `signUp` are using a `network-only` fetchPolicy on the client side
        // we need to be secure with our data since we are passing sensitive data, like an email, through an HTTP request which is easily intercepted and viewed, exposing client data is a security risk.
        // ::: User :::
        signUp: async (parent, args, context) => {
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
                return Promise.reject(new GraphQLError(`🚫 Email is already taken, try another.`));
            }
            if (usernameExists) {
                return Promise.reject(new GraphQLError(`🚫 Username is already taken, try another.`));
            }
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            const user = await context.prisma.user.create({
                data: {
                    ...args,
                    password: hashedPassword,
                },
            });
            await context.prisma.userProfile.create({
                data: {
                    userId: user.id,
                },
            });
            const token = generateToken(user.id);
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
            const token = generateToken(user.id);
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
                return Promise.reject(new GraphQLError(`🚫 That user doesn't seem to exist`));
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
            const { type, name, username } = args;
            const updatedUser = await context.prisma.user
                .update({
                where: { id: user.id },
                data: {
                    ...(type && { type }),
                    ...(name && { name }),
                    ...(username && { username }),
                },
            })
                .catch((err) => {
                if (
                // verify error is a unique constraint error
                err.code === 'P2002' &&
                    err instanceof PrismaClientKnownRequestError)
                    return Promise.reject(new GraphQLError(`🚫 Username is already taken, try another one.`));
            });
            return updatedUser;
        },
        // ::: Pet :::
        postPet: async (parent, args, context) => {
            const { user } = context;
            if (!user)
                return Promise.reject(new GraphQLError(`🚫 User is not authenticated. Please log in.`));
            if (user.type !== 'AGENCY')
                return Promise.reject(new GraphQLError(`🚫 This user does not have the proper authorization to do this.`));
            const { name, species, location } = args;
            if (!name || !species)
                return Promise.reject(new GraphQLError(`🚫 Name and species are required fields when creating a pet.`));
            const newPet = await context.prisma.pet.create({
                data: {
                    name,
                    species,
                    ...(location && { location }),
                    agencyId: user.id,
                },
            });
            await context.prisma.petProfile.create({
                data: {
                    petId: newPet.id,
                },
            });
            return newPet;
        },
        updatePet: async (parent, args, context) => {
            const { user } = context;
            const { id, name, species, location } = args;
            if (!user)
                return Promise.reject(new GraphQLError(`🚫 User is not authenticated. Please log in.`));
            const petToUpdate = await context.prisma.pet.findUnique({
                where: { id },
            });
            if (petToUpdate.agencyId !== user.id)
                return Promise.reject(new GraphQLError(`🚫 User: ${user.id} does not have permission to delete pet with id: ${petToUpdate.id}`));
            const updatedPet = await context.prisma.pet.update({
                where: { id },
                data: {
                    ...(name && { name }),
                    ...(species && { species }),
                    ...(location && { location }),
                },
            });
            return updatedPet;
        },
        deletePet: async (parent, args, context) => {
            const { user } = context;
            const { id } = args;
            if (!user)
                return Promise.reject(new GraphQLError(`🚫 User is not authenticated. Please log in.`));
            const petToDelete = await context.prisma.pet.findUnique({
                where: { id },
            });
            if (petToDelete.agencyId !== user.id)
                return Promise.reject(new GraphQLError(`🚫 User: ${user.id} does not have permission to delete pet with id: ${petToDelete.id}`));
            const deletedPet = await context.prisma.pet.delete({
                where: { id },
            });
            return deletedPet;
        },
        addBreedToPet: async (parent, args, context) => {
            const { user } = context;
            const { petId, breedId } = args;
            if (!user)
                return Promise.reject(new GraphQLError(`🚫 User is not authenticated. Please log in.`));
            // if pet.species !== breed.species throw error
            const petToUpdate = await context.prisma.pet.findUnique({
                where: { id: petId },
            });
            const breedToAdd = await context.prisma.breed.findUnique({
                where: { id: breedId },
            });
            if (petToUpdate.species !== breedToAdd.species)
                return Promise.reject(new GraphQLError(`🚫 Pet species must match breed species.`));
            const newBreedOnPet = await context.prisma.breedsToPets.create({
                data: {
                    petId,
                    breedId,
                },
            });
            if (!newBreedOnPet)
                return Promise.reject(new GraphQLError(`🚫 Something went wrong ::: addBreedToPet`));
            const petWithNewBreed = await context.prisma.pet.findUnique({
                where: { id: petId },
                select: {
                    id: true,
                    name: true,
                    species: true,
                    breed: true,
                },
            });
            if (!petWithNewBreed)
                return Promise.reject(new GraphQLError(`🚫 Couldn't locate that pet.`));
            return petWithNewBreed;
        },
        savePet: async (parent, args, context) => {
            const { user } = context;
            const { petId } = args;
            if (!user)
                return Promise.reject(new GraphQLError(`🚫 Not authenticated`));
            // save pet path
            // this is creating the SavedPetRecord record but the return is throwing null
            const savePet = await context.prisma.savedPetRecord.create({
                data: {
                    petId: petId,
                    userId: user.id,
                },
            });
            if (!savePet)
                return Promise.reject(new GraphQLError(`🚫 Server Error ::: savePet`));
            return await context.prisma.pet.findUnique({
                where: { id: petId },
            });
        },
    },
};
