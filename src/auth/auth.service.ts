import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private encoderService:EncoderService,
        private jwtService: JwtService
        ){}



        async registerUser(registerDto: RegisterUserDto): Promise<void>{
            const {name, email, password} = registerDto
            const hashPassword = await this.encoderService.encodePassword(password)
            return this.userRepository.createUser(name, email, hashPassword)
        }



        async login(loginDto: LoginDto): Promise<{accessToken:string}>{
            const {email, password} = loginDto;
            const user =  await this.userRepository.findOneByEmail(email);
            if(user && (await this.encoderService.checkPassword(password, user.password))){
            const payload: JwtPayload = {id: user.id, email, active: user.active};
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken};

            }
            throw new UnauthorizedException('Please check your credentials');
        }


}
