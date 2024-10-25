import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const createUserToken = (user: { index: number; role: string }) => {
    return jwt.sign(
        {
            index: user.index,
            role: user.role
        },
        process.env.JWT_SECRET!,
        {expiresIn: '30d'}
    );
};
