import {
  IsEmail,
  IsString,
  Length,
  IsArray,
  IsOptional,
} from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: "Định dạng email không hợp lệ" })
  email!: string;

  @IsString({ message: "Mật khẩu phải là chuỗi" })
  @Length(6, 100, { message: "Mật khẩu phải có độ dài từ 6 đến 100 ký tự" })
  password!: string;

  @IsString()
  clientId!: string;

  @IsString()
  redirectUri!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  scope?: string;
}
