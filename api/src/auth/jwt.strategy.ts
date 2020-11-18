import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.model';
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      //secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    //console.log("voici le :", payload);
    const currentUser = await this.userModel.findOne({ email: payload.username }).exec();
    return {
      id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      favorites: currentUser.favorites,
      score: currentUser.score,
      role: currentUser.role
    };
  }
}