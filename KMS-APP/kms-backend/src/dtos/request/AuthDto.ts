import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
} from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(3, { message: "Username must be at least 3 characters long" })
  username!: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password!: string;

  @Length(3, 50, { message: "Họ phải có độ dài từ 3 đến 50 ký tự" })
  firstName!: string;

  @Length(3, 50, { message: "Tên phải có độ dài từ 3 đến 50 ký tự" })
  lastName!: string;
  @Length(10, 15, {
    message: "Số điện thoại phải có độ dài từ 10 đến 15 ký tự",
  })
  @IsPhoneNumber("VN", { message: "Số điện thoại không hợp lệ" })
  phoneNumber!: string;

  @IsString({ message: "Giới tính phải là chuỗi" })
  gender!: string;

  @IsEmail({}, { message: "Định dạng email không hợp lệ" })
  email!: string;
}

export class LoginDto {
  @IsString()
  @MinLength(3, { message: "Username must be at least 3 characters long" })
  username!: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password!: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken!: string;
}

export class AuthResponseDto {
  accessToken!: string;
  refreshToken!: string;
  user!: {
    id: string;
    username: string;
  };
}
