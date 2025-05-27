import { Repository } from "typeorm";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { RefreshToken } from "../models/RefreshToken";
import { AppDataSource } from "../config/db/data-source";
import {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  AuthResponseDto,
} from "../dtos/request/AuthDto";
import { userMapper } from "../mappers/UserMapper";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const userRepository: Repository<User> = AppDataSource.getRepository(User);
const refreshTokenRepository: Repository<RefreshToken> =
  AppDataSource.getRepository(RefreshToken);

export const authService = {
  login: async (dto: LoginDto): Promise<AuthResponseDto> => {
    const user = await userRepository.findOne({
      where: { username: dto.username },
    });
    console.log("User found:", user);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(dto.password, user.password);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = await authService.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken: refreshToken.token,
      user: userMapper.toAuthResponseUser(user),
    };
  },

  refresh: async (dto: RefreshTokenDto): Promise<{ accessToken: string }> => {
    const storedToken = await refreshTokenRepository.findOne({
      where: { token: dto.refreshToken },
      relations: ["user"],
    });

    if (!storedToken || storedToken.expiryDate < new Date()) {
      throw new Error("Invalid or expired refresh token");
    }

    const accessToken = jwt.sign({ userId: storedToken.userId }, JWT_SECRET, {
      expiresIn: "15m",
    });
    return { accessToken };
  },

  logout: async (dto: RefreshTokenDto): Promise<void> => {
    await refreshTokenRepository.delete({ token: dto.refreshToken });
  },

  generateRefreshToken: async (userId: string): Promise<RefreshToken> => {
    const token = uuidv4();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const refreshToken = refreshTokenRepository.create({
      token,
      userId,
      expiryDate,
    });

    await refreshTokenRepository.save(refreshToken);
    return refreshToken;
  },
};
