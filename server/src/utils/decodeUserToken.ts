import jwt from 'jsonwebtoken';

export const decodeToken = (token: string): any => {
    try {
        if (!token) {
            console.error('Токен отсутствует.');
            return null;
        }

        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
        return null;
    }
};
