import jwt from 'jsonwebtoken';
import { config } from '../../config.js';
import bcrypt from 'bcrypt';

const generateToken = (id: number, email: string) =>
  jwt.sign({ id: id, email: email }, config.APP_SECRET, {
    expiresIn: '30d',
  });

const Mutation = {
  registerAgency: async (_parent, args, context) => {
    const { name, email, password } = args.input;

    const checkIfNameExists = await context.db.agency.findUnique({
      where: { name },
    });

    const checkIfEmailExists = await context.db.agency.findUnique({
      where: { email },
    });

    if (checkIfEmailExists) {
      throw new Error(`🚫 Email alraedy taken`);
    }

    if (checkIfNameExists) {
      throw new Error(`🚫 Name alraedy taken`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdAgency = await context.db.agency.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const validAgency = {
      ...createdAgency,
      token: generateToken(createdAgency.id, createdAgency.email),
    };

    return validAgency;
  },

  loginAgency: async (_parent, args, context) => {
    const { email, password } = args.input;

    const agency = await context.db.agency.findUnique({
      where: { email },
    });

    if (!agency) {
      throw new Error(`🚫 Email does not exist`);
    }

    const valid = await bcrypt.compare(password, agency.password);

    if (!valid) throw new Error(`🚫 Invalid password`);

    const authenticatedAgency = {
      ...agency,
      token: generateToken(agency.id, agency.email),
    };

    return authenticatedAgency;
  },

  createOrUpdateAgencyProfile: async (_parent, { input }, { db, agency }) => {
    if (!agency) throw new Error(`::: 🚫 No authenticated entity :::`);

    const { bio } = input;

    const updatedAgencyProfile = await db.agencyProfile.upsert({
      where: { agencyId: agency.id },
      update: { bio: bio },
      create: { bio: bio, agencyId: agency.id },
    });

    return updatedAgencyProfile;
  },

  createPet: async (_parent, { input }, { db, agency }) => {
    const { name, species } = input;

    const pet = await db.pet.create({
      data: {
        name: name,
        species: species,
        agencyId: agency.id,
      },
    });

    return pet;
  },

  addBreedToPet: async (_parent, { input }, { db, agency }) => {
    const { breedId, petId } = input;

    const pet = await db.pet.findUnique({
      where: { id: petId },
    });

    const breed = await db.breed.findUnique({
      where: { id: breedId },
    });

    console.log(`::: pet :::`, pet);
    console.log(`::: breed :::`, breed);

    if (pet.species !== breed.species) {
      throw new Error(`🚫 Cannot add this breed to current species.`);
    }

    await db.breedsToPets.create({
      data: {
        breedId: breedId,
        petId: petId,
      },
    });

    const updatedPet = await db.pet.findUnique({
      where: { id: petId },
      include: {
        breed: {
          include: {
            breed: true,
          },
        },
      },
    });

    return updatedPet;
  },
};

export { Mutation };
