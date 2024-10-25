import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authenticateToken = (allowedRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        let token: string | undefined;

        if (req.headers['authorization']) {
            token = req.headers['authorization'].split(' ')[1];
        } else {
            token = req.body.token;
        }

        if (!token) {
            return res.status(401).json({message: 'Токен обязателен.'}); // Unauthorized
        }

        jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
            if (err) {
                return res.status(403).json({message: 'Неверный токен.'}); // Forbidden
            }

            if (user && typeof user !== 'string' && allowedRoles.includes(user.role)) {
                req.user = user as JwtPayload;
                return next();
            } else {
                return res.status(403).json({message: 'Недостаточно прав.'}); // Forbidden
            }
        });
    };
};
