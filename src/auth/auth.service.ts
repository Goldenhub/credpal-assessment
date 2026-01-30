import crypto from "node:crypto";
import { addMinutes } from "date-fns";
import config from "../config";
import { sendEmail } from "../email/email.service";
import type { UserRepository } from "../user/user.repository";
import { CustomError } from "../utils/customError";
import { comparePassword } from "../utils/helpers";
import type { CreateUserDto, ForgotPasswordDto, LoginDto, ResetPasswordDto } from "./auth.dto";
import { tokenService } from "./token.service";

const { FRONTEND_URL } = config;

export class AuthService {
  constructor(private readonly userRepo: UserRepository) {}

  async register(input: CreateUserDto) {
    const existingUser = await this.userRepo.findByEmail(input.email);
    if (existingUser) {
      throw new CustomError("Unable to create account with provided credentials", 409);
    }

    const user = await this.userRepo.create({
      email: input.email,
      password: input.password,
      username: input.username, // hashed in the model level
    });

    return user;
  }

  async login(input: LoginDto) {
    const user = await this.userRepo.findByEmail(input.email);

    if (!user) {
      throw new CustomError("Invalid email or password", 400);
    }

    const isValidPassword = await comparePassword(input.password, user.password);

    if (!isValidPassword) {
      throw new CustomError("Invalid email or password", 400);
    }

    const jwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      profileUpdated: user.profileUpdated,
    };

    const accessToken = await tokenService.generateAccessToken(jwtPayload);

    return accessToken;
  }

  async forgotPassword(input: ForgotPasswordDto) {
    const user = await this.userRepo.findByEmail(input.email);

    if (!user) {
      throw new CustomError("Unable to make this request", 400);
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    const now = new Date();
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = addMinutes(now, 5); // 5 minutes

    await user.save();

    const resetLink = `${FRONTEND_URL}/reset-password?token=${rawToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset",
      html: `Click here to reset your password: ${resetLink}`,
    });
  }

  async resetPassword(input: ResetPasswordDto) {
    const hashedToken = crypto.createHash("sha256").update(input.token).digest("hex");

    const user = await this.userRepo.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new CustomError("Invalid or expired reset password token", 400);
    }

    user.password = input.newPassword; // hashed in the model
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Password Reset",
      html: "Password has been reset successfully",
    });
  }
}
