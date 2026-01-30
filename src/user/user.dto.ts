import { IsString } from "class-validator";

export class UpdateProfileDto {
  @IsString()
  firstname!: string;

  @IsString()
  lastname!: string;
}
