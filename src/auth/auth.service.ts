import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private encoderService:EncoderService
        ){}



        async registerUser(registerDto: RegisterUserDto): Promise<void>{
            const {name, email, password} = registerDto
            const hashPassword = await this.encoderService.encodePassword(password)
            return this.userRepository.createUser(name, email, hashPassword)
        }



        async login(loginDto: LoginDto): Promise<string>{
            const {email, password} = loginDto;
            const user =  await this.userRepository.findOneByEmail(email);
            if(user && (await this.encoderService.checkPassword(password, user.password))){
            return 'jwt';

            }
            throw new UnauthorizedException('Please check your credentials');
        }


}
