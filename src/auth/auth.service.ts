import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './users.repository';
import {v4} from 'uuid';
import { ActivateUserDto } from './dto/activate-user.dto';
import { User } from './user.entity';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';


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

            return this.userRepository.createUser(name, email, hashPassword, v4())
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

        
        async activateUser(activateUserDto: ActivateUserDto): Promise<void>{
            const {id, code} = activateUserDto;
            const user: User = await this.userRepository.findOneInactiveByIDAndActivationTOken(id, code);

            if(!user){
                throw new UnprocessableEntityException('this action can not be done')
            }
            this.userRepository.activateUser(user);

        }



        async requestResetPassword(requestResetPasswordDto: RequestResetPasswordDto): Promise<void>{
            
        }
}
