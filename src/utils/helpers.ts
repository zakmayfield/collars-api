import { GraphQLError } from 'graphql';
import { APP_SECRET } from './constants.js';
import jwt from 'jsonwebtoken';

export const applyTakeConstraints = (params: {
  min: number;
  max: number;
  value: number;
}) => {
  if (params.value < params.min || params.value > params.max) {
    throw new GraphQLError(
      `'take' argument value '${params.value}' is outside the valud range of ${params.min} to ${params.max}`
    );
  }

  return params.value;
};

export const applySkipConstraints = (params: {
  min: number;
  max: number;
  value: number;
}) => {
  if (params.value < params.min || params.value > params.max) {
    throw new GraphQLError(
      `'skip' argument value '${params.value}' is outside the valud range of ${params.min} to ${params.max}`
    );
  }

  return params.value;
};

export const generateToken = (
    userId: string
  ) => {
  return jwt.sign({ userId }, APP_SECRET, { expiresIn: '24h' });
};
