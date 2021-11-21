import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EncoderService } from './auth/services/encoder.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth/guards/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory:(config:ConfigService) =>({
      type: 'mysql',
        host: config.get<string>("DATABASE_HOST"),
        port: parseInt(config.get<string>('DATABASE_PORT')),
        username: config.get<string>("DATABASE_USERNAME"),
        password: config.get<string>("DATABASE_PASSWORD"),
        database: config.get<string>("DATABASE_DB"),
        autoLoadEntities: true,
        synchronize: true,
    })
  }), ConfigModule.forRoot({
    isGlobal:true, 
    envFilePath:'.env'
  }), AuthModule],
  controllers: [],
  providers: [AppService, EncoderService],
})
export class AppModule {}
