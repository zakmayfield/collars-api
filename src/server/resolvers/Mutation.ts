import jwt from 'jsonwebtoken'
import config from '../config'
import bcrypt from 'bcrypt'

const generateToken = (id: number) =>
  jwt.sign({ memberId: id }, config.APP_SECRET, { expiresIn: '2d' });

export const Mutation = {
  test: () => 'test',

  registerAgency: async (_parent, args, context) => {
    const {name, email, password} = args.input

    const checkIfNameExists = await context.db.agency.findUnique({
      where: { name }
    })

    const checkIfEmailExists = await context.db.agency.findUnique({
      where: { email }
    })

    if (checkIfEmailExists) {
      throw new Error(`🚫 Email alraedy taken`)
    }

    if (checkIfNameExists) {
      throw new Error(`🚫 Name alraedy taken`);
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const createdAgency = await context.db.agency.create({
      data: {
        name, 
        email,
        password: hashedPassword
      }
    })

    const validAgency = {
      ...createdAgency,
      token: generateToken(createdAgency.id)
    }

    return validAgency
  }
}