import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) { }

    async register(nombre: string, email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            nombre,
            email,
            password: hashedPassword,
        });
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') { // Código de error de MySQL para duplicados
                throw new ConflictException('El email ya está registrado');
            }
            throw error;
        }
    }

    async login(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.usersService.findByEmail(email);
        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }

    async validateUser(payload: { email: string; sub: number }): Promise<User> {
        return this.usersService.findById(payload.sub);
    }
}