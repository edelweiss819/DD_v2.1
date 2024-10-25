import User, {IUser} from '../models/User';
import {Response, Request} from 'express';
import bcrypt from 'bcryptjs';
import Article from '../models/Article';
import dotenv from 'dotenv';
import {decodeToken} from '../utils';


dotenv.config();

export class UsersController {
    async addUser(req: Request, res: Response) {
        try {
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                                         firstName,
                                         lastName,
                                         email,
                                         password: hashedPassword,
                                         role: 'user',
                                         registrationDate: Math.floor(Date.now() / 1000),
                                         avatar: 'defaultAvatar'
                                     });

            const maxIndexUser = await User.findOne().sort('-index').lean().exec();
            console.log('Результат запроса на получение максимального индекса:', maxIndexUser);

            newUser.index = maxIndexUser ? (maxIndexUser.index || 0) + 1 : 1;
            console.log('Конечный индекс:', newUser.index);

            await newUser.save();

            return res.status(201).json({
                                            message: 'Пользователь успешно добавлен.',
                                            user: newUser
                                        });
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);

            if ((error as any).code === 11000) {
                return res.status(409).json({message: 'Пользователь с таким email уже существует.'});
            }

            return res.status(500).json({message: 'Ошибка при добавлении пользователя.'});
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const index = Number(req.params.index);
            const token = req.headers['authorization']?.split(' ')[1];
            const decoded = decodeToken(token!);
            const role = decoded.role;
            console.log(`Запрос на удаление пользователя с индексом ${index}`)

            if (role !== 'admin') {
                console.warn('Недостаточно прав для удаление пользователя.')
                return res.status(403).json({message: 'Недостаточно прав для удаление пользователя.'})
            }

            const deletedUser = await User.findOneAndDelete({index});
            if (!deletedUser) {
                console.log(`Пользователь с индексом ${index} успешно удален!`)
                return res.status(404).json({message: 'Пользователь не найден.'});
            }

            return res.status(200).json({
                                            message: 'Пользователь удален',
                                            deletedUser
                                        });
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
            return res.status(500).json({message: 'Ошибка при удалении пользователя.'});
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            const decoded = decodeToken(token!);
            const role = decoded.role;
            const index = Number(req.params.index);
            const updatedData: Partial<IUser> = req.body.updatedData;
            // console.log('Данные для обновления:', updatedData)

            if (role !== 'admin') {
                console.warn('Недостаточно прав для изменения пользователя.')
                return res.status(403).json({message: 'Недостаточно прав для изменения пользователя.'});
            }

            const newUserData: Partial<IUser> = {};
            if (updatedData.firstName) newUserData.firstName = updatedData.firstName;
            if (updatedData.lastName) newUserData.lastName = updatedData.lastName;
            if (updatedData.email) newUserData.email = updatedData.email;
            if (updatedData.role) newUserData.role = updatedData.role;

            const user = await User.findOneAndUpdate({index: index}, newUserData, {new: true});

            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден.'});
            }

            return res.status(200).json({
                                            message: 'Пользователь обновлен:',
                                            user
                                        });
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
            return res.status(500).json({message: 'Ошибка при обновлении пользователя.'});
        }
    }


    async getUser(req: Request, res: Response) {

        try {
            const token = req.headers.authorization?.split(' ')[1];
            const userRequestIndex = Number(req.query['user-index']);
            const userFields = req.query['user-fields'] as string;
            console.log(`Индекс запрашиваемого пользователя: ${userRequestIndex}`);
            const decoded = decodeToken(token!)
            console.log('Токен успешно декодирован:', decoded);

            const userRole = decoded.role;
            const userIndex = Number(decoded.index);

            let user;

            if (userIndex) {
                user = await User.findOne({index: userRequestIndex});
                console.log(`Пользователь по индексу ${userRequestIndex} найден.`);
            } else if (userRole === 'admin' && !userRequestIndex) {
                user = await User.findOne({index: userRequestIndex});
                console.log(`Пользователь с индексом ${userRequestIndex} найден (Администратор).`);
            }

            if (!user) {
                console.warn(`Пользователь с индексом ${userRequestIndex} не найден.`);
                return res.status(404).json({message: 'Пользователь не найден.'});
            }

            if (!userFields) {
                console.warn('Ошибка: user-fields не передан в параметрах запроса.');
                return res.status(400).json({message: 'Отсутствуют данные пользователя.'});
            }

            const splitOutData = userFields.split(',');
            console.log(`Запрошенные поля пользователя с индексом ${userRequestIndex}:`, splitOutData);

            const protectedFields = [
                'password',
                'email',
                'lastArticles'
            ];
            const resFields: any = {};

            for (const field of splitOutData) {
                const trimmedField = field.trim() as keyof IUser;

                if (
                    protectedFields.includes(trimmedField) &&
                    (userRole !== 'admin' && userIndex !== userRequestIndex)
                ) {
                    console.warn(`Пользователь ${userIndex} не имеет доступа к полю: ${trimmedField} пользователя ${userRequestIndex}`);
                    continue;
                }

                if (trimmedField in user) {
                    resFields[trimmedField] = user[trimmedField];
                }
            }

            return res.status(200).json({
                                            message: 'Данные пользователя:',
                                            user: resFields,
                                        });

        } catch (error) {
            console.error('Ошибка при получении пользователя:', error);
            return res.status(500).json({message: 'Ошибка при получении пользователя.'});
        }
    }


    async getAllUsers(req: Request, res: Response) {
        try {
            const limit = Number(req.query.limit) || 25;
            const page = Number(req.query.page) || 1;
            const token = req.headers.authorization?.split(' ')[1];
            const decoded = decodeToken(token!);
            const role = decoded.role;
            const sortBy: keyof IUser = req.query.sortBy as keyof IUser;
            const sortIndex = Number(req.query.sortIndex) === 1 ? 1 : -1;
            const userFields = req.query['user-fields'] as string;

            if (role !== 'admin') {
                console.warn('Нет прав для доступа.');
                return res.status(403).json({message: 'Ошибка доступа. Недостаточно прав.'});
            }

            if (!userFields) {
                console.warn('Ошибка: user-fields не передан в параметрах запроса.');
                return res.status(400).json({message: 'Отсутствуют данные пользователя.'});
            }

            let allUsers;
            if (sortBy) {
                allUsers = await User.find()
                    .sort({[sortBy]: sortIndex})
                    .skip((page - 1) * limit)
                    .limit(limit);
            } else {
                allUsers = await User.find()
                    .skip((page - 1) * limit)
                    .limit(limit);
            }

            if (allUsers.length === 0) {
                return res.status(404).json({message: 'Пользователей не найдено.'});
            }

            const resUsers = allUsers.map(user => {
                const resFields: any = {};
                const splitedData = userFields.split(',');

                for (const field of splitedData) {
                    const trimmedField = field.trim() as keyof IUser;

                    if (trimmedField in user) {
                        resFields[trimmedField] = user[trimmedField];
                    }
                }

                return resFields;
            });

            return res.status(200).json({
                                            message: 'Пользователи получены:',
                                            users: resUsers,
                                        });
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            return res.status(500).json({message: 'Ошибка при получении пользователей.'});
        }
    }


    async getUserFavoriteArticlesList(req: Request, res: Response) {

        try {
            const token = req.headers.authorization?.split(' ')[1];
            const decoded = decodeToken(token!)
            const userRole = decoded.role;
            const userIndex = Number(decoded.index);


            const user = await User.findOne({index: userIndex});


            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден.'});
            }

            const userFavArticlesList = user.favoriteArticles;

            if (userIndex === user.index || userRole === 'admin') {
                return res.status(200).json({
                                                message: `Любимые статьи пользователя номер ${userIndex}`,
                                                favoriteArticles: userFavArticlesList
                                            });
            } else {
                console.log('Ошибка: Недостаточно прав.');
                return res.status(403).json({message: 'Недостаточно прав'});
            }

        } catch (err) {
            console.error('Ошибка в обработке запроса:', err);
            return res.status(500).json({message: 'Ошибка сервера.'});
        }
    }


    async toggleArticleFavStatus(req: Request, res: Response) {

        try {
            const {
                index,
                token
            } = req.body;
            const decoded = decodeToken(token!);
            const userIndex = decoded.index;

            const user = await User.findOne({index: userIndex});
            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден.'});
            }

            const article = await Article.findOne({index});
            if (!article) {
                return res.status(404).json({message: 'Статья не найдена.'});
            }

            const {title} = article;
            const favoriteArticle = user.favoriteArticles.find(fav => fav.index === index);

            if (favoriteArticle) {
                user.favoriteArticles = user.favoriteArticles.filter(fav => fav.index !== index);
                await user.save();

                return res.status(200).json({
                                                message: 'Статья удалена из избранного.',
                                                favoriteArticles: user.favoriteArticles,
                                            });
            } else {

                user.favoriteArticles.push({
                                               index,
                                               title
                                           });
                await user.save();

                return res.status(200).json({
                                                message: 'Статья добавлена в избранное.',
                                                favoriteArticles: user.favoriteArticles,
                                            });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({message: 'Ошибка сервера.'});
        }
    }


    async addArticleToLastArticlesList(req: Request, res: Response) {

        try {
            const token = req.headers.authorization?.split(' ')[1];
            const articleIndex = req.body.articleIndex;
            const decoded = decodeToken(token!);
            const userIndex = Number(decoded.index);
            const user = await User.findOne({index: userIndex});

            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден.'});
            }

            const article = await Article.findOne({index: articleIndex});
            if (!article) {
                return res.status(404).json({message: 'Статья не найдена.'});
            }

            user.lastArticles = user.lastArticles.filter((article) => article.index !== articleIndex);
            user.lastArticles.push({
                                       index: article.index,
                                       title: article.title,
                                       timestamp: Math.floor(Date.now() / 1000)
                                   });

            await user.save();

            return res.status(200).json({
                                            message: 'Последняя статья обновлена.',
                                            lastArticles: user.lastArticles.sort((a,
                                                                                  b) => a.timestamp - b.timestamp),
                                        });

        } catch (err) {
            console.error(err);
            return res.status(500).json({message: 'Ошибка сервера.'});
        }
    }

    async getUserLastArticlesList(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const decoded = decodeToken(token!);
            const userIndex = Number(decoded.index);
            const user = await User.findOne({index: userIndex});

            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден.'});
            }


            return res.status(200).json({
                                            message: `Список последних статей пользователя ${userIndex}.`,
                                            lastArticles: user.lastArticles

                                        });

        } catch (err) {
            console.error(err);
            return res.status(500).json({message: 'Ошибка сервера.'});
        }
    }

    async getUserAvatar(req: Request, res: Response) {
        try {
            const userIndex = Number(req.query.index);


            if (!userIndex) {
                return res.status(400).json({message: 'Индекс автора обязателен.'});
            }


            const user = await User.findOne({index: userIndex});

            if (!user) {
                return res.status(404).json({message: 'Автор по индексу не найден.'});
            }


            const avatarUrl = user.avatar;

            return res.status(200).json({
                                            userIndex,
                                            avatarUrl,
                                        });

        } catch (err) {
            console.error(err);
            return res.status(500).json({message: 'Ошибка сервера.'});
        }

    }

    async getUsersCount(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const role = decodeToken(token!).role;
            if (role !== 'admin') {
                console.warn('Недостаточно прав для получения количества пользователей.');
                return res.status(403).json({message: 'Недостаточно прав.'});
            }
            const usersCount = await User.countDocuments();
            return res.status(200).json({
                                            message: 'Всего пользователей на сайте:',
                                            usersCount
                                        });


        } catch (err) {
            console.error(err);
            return res.status(500).json({message: 'Ошибка сервера.'});
        }
    }
}


export const usersController = new UsersController();
