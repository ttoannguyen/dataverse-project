import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User";
import { RegisterDto, AuthResponseDto } from "../dtos/request/AuthDto";
import { UserResponseDto } from "../dtos/response/UserResponseDto";

export const userMapper = {
  toUserFromRegisterDto: async (dto: RegisterDto): Promise<User> => {
    return {
      id: uuidv4(),
      username: dto.username,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phoneNumber: dto.phoneNumber,
      gender: dto.gender,
      email: dto.email,
      // password: hashedPassword,
    } as User;
  },

  toUserResponseDto: async (user: User): Promise<UserResponseDto> => {
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      gender: user.gender,
      createdAt: user.createdAt,
    } as UserResponseDto;
  },
  toAuthResponseUser: (user: User): AuthResponseDto["user"] => {
    return {
      id: user.id,
      username: user.username,
    };
  },
};
