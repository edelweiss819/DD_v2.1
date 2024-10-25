import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt, {JwtPayload} from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';
import {createUserToken} from '../utils';

dotenv.config();

export class AuthController {
    async login(req: Request, res: Response) {
        try {
            const {
                email,
                password
            } = req.body;

            const user = await User.findOne({email});
            if (!user) {
                console.log('Пользователь не найден.');
                return res.status(400).json({message: `Пользователь ${email} не найден.`});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.log('Неверный пароль.');
                return res.status(401).json({message: 'Неверный пароль.'});
            }

            const token = createUserToken({
                                              index: user.index,
                                              role: user.role
                                          });

            return res.status(200).json({token});
        } catch (error) {
            console.error('Ошибка при входе пользователя:', error);
            return res.status(500).json({message: 'Ошибка при входе'});
        }
    }

    async refreshToken(req: Request, res: Response) {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'Токен обязателен.'}); // Unauthorized
        }

        jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
            if (err) {
                return res.status(403).json({message: 'Неверный токен.'}); // Forbidden
            }

            const user = decoded as JwtPayload;

            const newToken = createUserToken({
                                                 index: user.index,
                                                 role: user.role
                                             });

            return res.status(200).json({token: newToken});
        });
    }
}

export const authController = new AuthController();
