import jwt from 'jsonwebtoken'
import config from '../config'
import bcrypt from 'bcrypt'

const generateToken = (id: number) =>
  jwt.sign({ memberId: id }, config.APP_SECRET, { expiresIn: '2d' });

export const Mutation = {
  test: () => 'test'
}