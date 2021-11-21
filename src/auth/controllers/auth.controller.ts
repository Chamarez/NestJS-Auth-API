import { Body, Controller, Get, NotFoundException, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ActivateUserDto } from '../dto/activate-user.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { RequestResetPasswordDto } from '../dto/request-reset-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { JwtStrategy } from '../guards/jwt.strategy';
import { RolesGuard } from '../guards/roles.guard';
import { User } from '../models/user.entity';
import {AuthGuard} from '@nestjs/passport'
import { JwtAuthGuard } from '../guards/jwtauth.guard';
import { ChangePasswordDto } from '../dto/change-password.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }


  @Get('/activate-account')
  @Patch('/request-reset-password')
  activate(@Query() activateUserDto: ActivateUserDto): Promise<void> {
    return this.authService.activateUser(activateUserDto);
  }
  @Patch('/request-reset-password')
  requestResetPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
  ): Promise<void> {
    return this.authService.requestResetPassword(requestResetPasswordDto);
  }


  @Patch('/reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<void> {
    return this.authService.changePassword(changePasswordDto);
  }




  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  async findAll(): Promise<User[]> {
    try {
      return await this.authService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find products`);
    }
  }






}
