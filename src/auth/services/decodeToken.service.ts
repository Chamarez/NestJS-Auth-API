import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { User } from '../models/user.entity';

@Injectable()
export class DecodeToken {

    public extractTokenNow(req) { 
      let token:string;
        try{

          if (req.split(' ')[0] === 'Bearer') {
              console.log(req.split(' ')[1]);
              token = req.split(' ')[1];
              const user:User = jwt_decode(token);
              return user;
              
            }
        }   catch{
            throw new UnauthorizedException('This cant be done');
        }

  }
}
