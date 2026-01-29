import jwt, { type Secret, type SignOptions, TokenExpiredError, type VerifyOptions } from "jsonwebtoken";
import type { StringValue } from "ms";
import config from "../config";
import { CustomError } from "../utils/customError";
import type { IAccessToken } from "./auth.interface";

const { ACCESS_TOKEN_EXPIRATION, ACCESS_TOKEN_SECRET } = config;
const access_expiresIn = ACCESS_TOKEN_EXPIRATION as StringValue;
const access_secret = ACCESS_TOKEN_SECRET as Secret;

export const tokenService = {
  async generateAccessToken(payload: IAccessToken, options?: SignOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      const signOptions: SignOptions = {
        ...options,
        expiresIn: access_expiresIn,
      };
      jwt.sign(payload, access_secret, signOptions, (err, token) => {
        if (err || !token) {
          return reject(err || new CustomError("Token could not be generated", 400));
        }
        resolve(token);
      });
    });
  },

  async verifyAccessToken<T extends object>(token: string, options?: VerifyOptions): Promise<T> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, access_secret, options, (err, decoded) => {
        if (err || !decoded) {
          if (err instanceof TokenExpiredError) {
            return reject(new CustomError("Token expired", 401));
          }
          return reject(err || new CustomError("Token could not be verified", 400));
        }
        resolve(decoded as T);
      });
    });
  },
};
