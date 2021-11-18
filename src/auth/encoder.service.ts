import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"



@Injectable()
export class EncoderService {

    async encodePassword(password: string): Promise<string> {

        const salt = await bcrypt.genSalt();
        return await  bcrypt.hash(password, salt);
    }

    async checkPassword(password: string, userPassword:String): Promise<boolean> {
        return await bcrypt.compare(password, userPassword);
    }

}