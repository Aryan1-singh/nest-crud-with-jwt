import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class UsersService {
    private readonly userRepository;
    private readonly authService;
    private readonly jwtSecret;
    constructor(userRepository: Repository<User>, authService: AuthService);
    create(userDto: UserDto): Promise<{
        user: User;
    }>;
    findOne(username: string): Promise<User>;
    findOnebyID(userId: number): Promise<User>;
    findAll(): Promise<User[]>;
    updateUser(userId: number, userDto: UserDto): Promise<User>;
    deleteUser(id: number): Promise<void>;
    validateUserByEmail(email: string, password: string): Promise<{
        token: string;
    }>;
}
