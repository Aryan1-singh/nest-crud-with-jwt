"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const auth_service_1 = require("../auth/auth.service");
const jwt = require("jsonwebtoken");
let UsersService = class UsersService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.jwtSecret = 'SBEQUSATXXXDXEZ3BC56RG6O2SZC7UMMY5YGZ4W5GQZPFHPPHUHKB2UC';
    }
    async create(userDto) {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const user = this.userRepository.create({ ...userDto, password: hashedPassword });
        await this.userRepository.save(user);
        return { user };
    }
    async findOne(username) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${username} not found`);
        }
        return user;
    }
    async findOnebyID(userId) {
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${userId} not found`);
        }
        return user;
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async updateUser(userId, userDto) {
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, userDto);
        return this.userRepository.save(user);
    }
    async deleteUser(id) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
    }
    async validateUserByEmail(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.HttpException('Invalid email or password', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!user.password) {
            throw new common_1.HttpException('Password not found', common_1.HttpStatus.UNAUTHORIZED);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException('Invalid email or password', common_1.HttpStatus.UNAUTHORIZED);
        }
        const token = jwt.sign({ id: user.userId, email: user.email, name: user.name }, this.jwtSecret, { expiresIn: '8h' });
        return { token };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map