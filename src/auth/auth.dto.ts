import { IsEmail, IsString } from "class-validator";
import { IsValidPassword } from "../decorators/is-valid-password";

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsValidPassword()
  password!: string;

  @IsString()
  username!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsValidPassword()
  password!: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email!: string;
}

export class ResetPasswordDto {
  @IsString()
  token!: string;

  @IsValidPassword()
  newPassword!: string;
}
