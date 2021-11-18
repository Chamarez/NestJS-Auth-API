import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { UserRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(@InjectRepository(UserRepository)
    private userRepository: UserRepository,
    ){
        super({
            secretOrKey:'Esto-No-Va-Aca',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: JwtPayload): Promise<User>{
        const {email} = payload ;
        const user = this.userRepository.findOneByEmail(email);

        if(!user){
            throw new UnauthorizedException();

        }
        return user;

    }
}