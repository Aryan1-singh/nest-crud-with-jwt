import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(userDto: UserDto): Promise<{
        user: User;
    }>;
    findOne(id: number): Promise<User>;
    findAll(): Promise<User[]>;
    updateUser(id: string, updateUserDto: UserDto): Promise<User>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    deleteUser(id: string): Promise<void>;
}
