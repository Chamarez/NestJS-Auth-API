import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        ){}



        async registerUser(registerDto: RegisterUserDto): Promise<void>{
            return this.userRepository.createUser(registerDto)
        }
}
