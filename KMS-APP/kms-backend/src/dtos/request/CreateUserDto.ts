import {
  IsEmail,
  Length,
  IsString,
  IsPhoneNumber,
  IS_PHONE_NUMBER,
} from "class-validator";

export class CreateUserDto {
  @Length(3, 50, { message: "Tên phải có độ dài từ 3 đến 50 ký tự" })
  username!: string;

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

  @IsString({ message: "Mật khẩu phải là chuỗi" })
  @Length(6, 100, { message: "Mật khẩu phải có độ dài từ 6 đến 100 ký tự" })
  password!: string;
}
