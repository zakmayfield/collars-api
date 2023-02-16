import { PrismaClient } from '@prisma/client';


export type ServerContext = {
  prisma: PrismaClient;
  user: SecureUser | null
};

export type SecureUser = {
  id: number;
  name: string;
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
  password: string;
  type: AccountType;
}

export enum AccountType {
  DEFAULT = 'DEFAULT',
  VOLUNTEER = 'VOLUNTEER',
  AGENCY = 'AGENCY'
}

export interface LoginArgs {
  email: string;
  password: string;
}
export interface DeleteUserAccountArgs {
  password: string;
}

export interface PostLinkArgs {
  description: string;
  url: string;
}
export interface UpdateLinkArgs {
  id: number;
  description: string;
  url: string;
}

export interface PostCommentArgs {
  body: string;
  linkId: number;
}
export interface UpdateCommentArgs {
  commentId: number;
  body: string;
}
