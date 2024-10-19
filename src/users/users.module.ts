// src/users/users.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity'; // Import your entity
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
  forwardRef(() => AuthModule), // Use forwardRef if needed
], // Register the User entity
  controllers: [UsersController],
  providers: [ UsersService],
    exports: [UsersService], // Ensure that UsersService is exported

  
})
export class UsersModule {}
