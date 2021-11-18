import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
