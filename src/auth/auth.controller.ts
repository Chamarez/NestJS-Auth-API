import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {RegisterUserDto} from './dto/register-user.dto'

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
}
