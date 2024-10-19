// src/users/users.service.ts
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import * as jwt from 'jsonwebtoken';




@Injectable()
export class UsersService {
  private readonly jwtSecret = 'SBEQUSATXXXDXEZ3BC56RG6O2SZC7UMMY5YGZ4W5GQZPFHPPHUHKB2UC'; 

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService, // Inject AuthService


  ) {}

  // async create(userDto: UserDto) {
  //   let token;
  //   const hashedPassword = await bcrypt.hash(userDto.password, 10);
  //   const user = this.userRepository.create({ ...userDto, password: hashedPassword });
  //   await this.userRepository.save(user);

  // try{
  //    token = await this.authService.generateToken(user); // Generate token after saving the user
  //   console.log("🚀 ~ UsersService ~ create ~ token:", token)
  // }
  // catch(e) {
  //   console.log("🚀 ~ UsersService ~ create ~ e:", e)
  //   }
  //   return { user, token }; // Return user data and token
  // }
  async create(userDto: UserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = this.userRepository.create({ ...userDto, password: hashedPassword });
    await this.userRepository.save(user);
  
    // Remove token generation
    return { user }; // Return only the user data
  }
  

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } }); // Pass the condition correctly
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async findOnebyID(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } }); // Pass the condition correctly
    if (!user) {
      throw new NotFoundException(`User with username ${userId} not found`);
    }
    return user;
  }
  

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Update a user
  async updateUser(userId: number, userDto: UserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } }); // Use an options object
    if (!user) {
      throw new Error('User not found'); // Handle user not found case
    }
    Object.assign(user, userDto); // Update user properties
    return this.userRepository.save(user); // Save the updated entity
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async validateUserByEmail(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    if (!user.password) {
      throw new HttpException('Password not found', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.userId, email: user.email,name:user.name }, // Ensure role has a name property
      this.jwtSecret,
      { expiresIn: '8h' } // Token expiration time
    );

    return { token };
  }
}
