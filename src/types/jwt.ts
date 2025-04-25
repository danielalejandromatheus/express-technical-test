import { Role } from './user';

export type JwtUserPayload = {
  sub: string;
  email: string;
  name: string;
  role: Role;
  iat: number;
  exp: number;
};
export type JwtResponse = {
  accessToken: string;
  expiresAt: number;
};
