import bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "../models/User";
import { AppDataSource } from "../config/db/data-source";
import { userMapper } from "../mappers/UserMapper";
import { AppError } from "../errors/AppError";
import { UserResponseDto } from "../dtos/response/UserResponseDto";
import { RegisterDto } from "../dtos/request/AuthDto";

// Khởi tạo repository
const userRepository: Repository<User> = AppDataSource.getRepository(User);

// Xuất userService với arrow function
export const userService = {
  getUsers: async (): Promise<UserResponseDto[]> => {
    try {
      const users = await userRepository.find();
      return await Promise.all(
        users.map((user) => userMapper.toUserResponseDto(user))
      );
    } catch (error) {
      throw new AppError("Failed to fetch users", 500);
    }
  },

  getUserById: async (id: string): Promise<UserResponseDto | null> => {
    try {
      const user = await userRepository.findOne({ where: { id } });
      if (!user) {
        return null;
      }
      return userMapper.toUserResponseDto(user);
    } catch (error) {
      throw new AppError("Failed to fetch user", 500);
    }
  },

  registerUser: async (dto: RegisterDto): Promise<UserResponseDto> => {
    const existingUser = await userRepository.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });
    if (existingUser) {
      throw new AppError("Username or email already exists", 409);
    }

    let user = await userMapper.toUserFromRegisterDto(dto);
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    user.password = hashedPassword;
    user = await userRepository.save(user);

    return await userMapper.toUserResponseDto(user);
  },
};
