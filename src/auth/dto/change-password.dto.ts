import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class ChangePasswordDto{
    @IsNotEmpty()
    @Length(6,20)
    password:string;


    @IsNotEmpty()
    @Length(6,20)
    newPassword:string;

}