import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { EncoderService } from './services/encoder.service';
import { JwtStrategy } from './guards/jwt.strategy';
import { UserRepository } from './repository/users.repository';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, EncoderService, JwtStrategy,   {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
