export interface AgencyContext {
  id: number;
  email: string;
  type: string;
  role: string | null;
  iat: number;
  exp: number;
}

export interface UserContext {
  id: number;
  email: string;
  type: string;
  role: string | null;
  iat: number;
  exp: number;
}
