// import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { UsersService } from '../users/users.service';
// import { UserDto } from '../users/user.dto';
// import { User } from '../users/user.entity';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('auth')
// export class AuthController {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly usersService: UsersService,
//   ) {}

//   @Post('register')
//   async register(@Body() userDto: UserDto) {
//     const { user } = await this.usersService.create(userDto);
//     // const token = this.authService.generateToken(user);
//     return { user,  }; // Return user data and token
//   }

//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   signIn(@Body() signInDto: Record<string, any>) {
//     return this.authService.signIn(signInDto.username, signInDto.password);
//   }

//   @UseGuards(AuthGuard)
//   @Get()
//   findAll(): Promise<User[]> {
//     return this.usersService.findAll();
//   }

// }

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
