import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule), // Use forwardRef to resolve circular dependency
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]), // Register User entity for repository injection

  ],
  providers: [AuthService,JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService,JwtAuthGuard],
})
export class AuthModule {}
