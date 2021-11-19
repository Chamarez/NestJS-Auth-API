import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ActivateUserDto } from './dto/activate-user.dto';
import { LoginDto } from './dto/login.dto';
import {RegisterUserDto} from './dto/register-user.dto'
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}


    @Post('/register')
    async register(@Body() registerUserDto: RegisterUserDto): Promise<void>{
        return this.authService.registerUser(registerUserDto)
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<{accessToken:string}>{
        return this.authService.login(loginDto);
    }

    @Get('/activate-account')
    activate(@Query() activateUserDto: ActivateUserDto) : Promise<void>{
        return this.authService.activateUser(activateUserDto)


    }

    @Patch('/request-reset-password')
    requestResetPassword(@Body() requestResetPasswordDto: RequestResetPasswordDto) : Promise<void>{
        return this.authService.requestResetPassword(requestResetPasswordDto)
    }

}
