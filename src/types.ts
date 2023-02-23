import { PrismaClient } from '@prisma/client';

export type ServerContext = {
  prisma: PrismaClient;
  user: SecureUser | null;
  res?: any
};

export type SecureUser = {
  id: string;
  name: string;
  username?: string;
  email: string;
  type: string;
};

export type ContextProps = {
  Prisma: PrismaClient;
  req: any;
};

export interface SignupArgs {
  name: string;
  email: string;
  username?: string;
  password: string;
  type: AccountType;
}

export enum AccountType {
  DEFAULT = 'DEFAULT',
  VOLUNTEER = 'VOLUNTEER',
  AGENCY = 'AGENCY',
}

export interface LoginArgs {
  email: string;
  password: string;
}

export interface DeleteUserAccountArgs {
  password: string;
}
export interface UpdateUserAccountArgs {
  type?: AccountType;
  name?: string;
  username?: string;
}

export interface PostPetArgs {
  name: string;
  species: Species;
  location?: string;
  agencyId: string;
}

export interface UpdatePetArgs {
  id: string;
  name?: string;
  species?: Species;
  location?: string;
}

export enum Species {
  CAT = 'CAT',
  DOG = 'DOG',
  BIRD = 'BIRD',
  HORSE = 'HORSE',
  FISH = 'FISH',
  REPTILE = 'REPTILE',
  BARNYARD = 'BARNYARD',
}
