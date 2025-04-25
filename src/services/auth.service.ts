import jwt from 'jsonwebtoken';
import { HydratedDocument } from 'mongoose';
import { JWT_SECRET, JWT_EXPIRATION } from 'src/consts/env';
import { UserModel, UserDocument } from 'src/models/user.model';
import { LoginDtoType, RegisterDtoType } from 'src/entities/auth.dto';
import {
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from 'src/utils/exceptions/http.exception';
import { getExpiration } from 'src/utils/jwt';
export const register = async ({ email, password, name }: RegisterDtoType) => {
  const findExisting = await UserModel.findOne({
    email,
  });
  if (findExisting)
    throw new UnprocessableEntityException({
      message: 'This email is already in use.',
    });
  const user = await UserModel.create({
    name,
    email,
    password,
    lastLogin: new Date(),
  });
  return generateToken(user);
};

export const login = async ({ email, password }: LoginDtoType) => {
  const user = await UserModel.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new UnauthorizedException('Invalid credentials');
  }
  user.lastLogin = new Date();
  await user.save();
  return generateToken(user);
};

const generateToken = ({
  _id,
  email,
  name,
  role,
}: HydratedDocument<UserDocument>) => {
  return {
    accessToken: jwt.sign(
      { sub: _id.toString(), email, name, role },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION,
      }
    ),
    expiresAt: getExpiration(JWT_EXPIRATION),
  };
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const getUserById = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException('User not found');
  return user;
};
