import { Request, Response } from 'express';
import * as AuthService from 'src/services/auth.service';
import { LoginDtoType, RegisterDtoType } from 'src/entities/auth.dto';
export const register = async (
  req: Request<{}, {}, RegisterDtoType>,
  res: Response
) => {
  const response = await AuthService.register(req.body);
  res.status(201).json(response);
};

export const login = async (
  req: Request<{}, {}, LoginDtoType>,
  res: Response
) => {
  const response = await AuthService.login(req.body);
  res.json(response);
};

export const me = async (req: Request, res: Response) => {
  if (!req.user) return;
  const user = await AuthService.getUserById(req.user.sub);
  res.json(user);
};
