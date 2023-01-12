import jwt from 'jsonwebtoken';
const config = require('../config')
import bcrypt from 'bcrypt';

const generateToken = (
  id: number,
  email: string
) =>
  jwt.sign(
    { id: id, email: email },
    config.APP_SECRET,
    {
      expiresIn: '2d',
    }
  );

export const Mutation = {
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
  }
};
