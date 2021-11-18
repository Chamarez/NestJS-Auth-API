import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'localhost',
      port: 5000,
      username: 'root',
      password: 'root',
      database: 'database',
      autoLoadEntities: true,
      synchronize: true,
  }), AuthModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
