import {Request, Response} from 'express';
import Article, {IArticle} from '../models/Article';
import User from '../models/User';
import dotenv from 'dotenv';
import Metadata from '../models/Metadata';
import {decodeToken} from '../utils';


dotenv.config();


export const getAllArticles = async (req: Request,
                                     res: Response): Promise<Response> => {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    try {
        const articles = await Article.find()
            .skip((page - 1) * limit)
            .limit(limit);

        return res.status(200).json(articles);
    } catch (error) {
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};

export const getArticleByIndex = async (req: Request,
                                        res: Response): Promise<Response> => {
    const {index} = req.params;

    try {

        const article = await Article.findOne({index});
        if (!article) {
            return res.status(404).json({message: 'Статья не найдена.'});
        }


        return res.status(200).json({
                                        article,
                                    });
    } catch (error) {
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};


export const getArticlesListByGenre = async (req: Request,
                                             res: Response): Promise<Response> => {
    const genre = decodeURIComponent(req.params.genre);
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    if (!genre) {
        return res.status(400).json({message: 'Жанр обязателен!'});
    }

    console.log('Поиск по жанру:', genre);

    try {
        const query = {
            genres: genre
        };


        const skip = (page - 1) * limit;


        const articlesQuery = Article.find(query)
            .sort({index: 1})
            .skip(skip)
            .limit(limit)
            .lean();


        const filteredArticlesByGenre = await articlesQuery.exec();

        if (filteredArticlesByGenre.length > 0) {
            return res.status(200).json(filteredArticlesByGenre);
        } else {
            return res.status(404).json({message: 'Статьи по жанру не найдены.'});
        }
    } catch (error) {
        console.error('Ошибка при получение статей по жанру:', error);
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};


//Поиск по жанру и тексту

export const getArticlesByGenreAndWords = async (req: Request,
                                                 res: Response): Promise<Response> => {
    const genres = req.query.genres as string;
    const limit = Number(req.query.limit as string) || 10;
    const cursor = Number(req.query.lastCursor) || 0;
    const searchWords = (req.query.s) as string || '';
    const words = searchWords.trim().split(' ').filter(Boolean);
    const sortOrder = Number(req.query.sortOrder) || 1;

    try {
        let articles: any[] = [];

        // 1. Если указаны только жанры
        if (genres && words.length === 0) {
            const singleGenres = genres.split(',');
            console.log('Поиск по массиву жанров:', singleGenres);
            const genreQuery: any = {
                genres: {$all: singleGenres}
            };
            genreQuery.index = sortOrder === 1 ? {$gt: cursor} : {$lte: cursor};

            articles = await Article.find(genreQuery)
                .sort({index: 1})
                .limit(limit)
                .lean();

            if (articles.length > 0) {
                console.log(`Найдено ${articles.length} статей по жанрам.`);
                return res.status(200).json({
                                                articles,
                                                cursor: articles[articles.length - 1].index
                                            });
            } else {
                console.log(`Статьи с набором жанров ${singleGenres} не найдены.`);
                return res.status(404).json({message: 'Статьи по заданным жанрам не найдены.'});
            }
        }

        // 2. Если указаны только слова
        if (words.length > 0 && !genres) {
            const searchQuery = {
                $or: [
                    {
                        title: {
                            $regex: words.join('|'),
                            $options: 'i'
                        }
                    },
                    {
                        content: {
                            $regex: words.join('|'),
                            $options: 'i'
                        }
                    }
                ],
                index: sortOrder === 1 ? {$gt: cursor} : {$lte: cursor}
            };

            articles = await Article.find(searchQuery)
                .sort({index: 1})
                .limit(limit)
                .lean();

            if (articles.length > 0) {
                console.log(`Найдено ${articles.length} статей по запросу.`);
                return res.status(200).json({
                                                articles,
                                                cursor: articles[articles.length - 1].index
                                            });
            } else {
                console.log('Статьи не найдены по указанным словам.');
                return res.status(404).json({message: 'Статьи по заданным словам не найдены.'});
            }
        }

        // 3. Если указаны как жанры, так и слова
        if (genres && words.length > 0) {
            const singleGenres = genres.split(',');
            console.log('Поиск по массиву жанров и словам:', singleGenres);
            const genreQuery: any = {
                genres: {$all: singleGenres}
            };
            const wordQuery = {
                $or: [
                    {
                        title: {
                            $regex: words.join('|'),
                            $options: 'i'
                        }
                    },
                    {
                        content: {
                            $regex: words.join('|'),
                            $options: 'i'
                        }
                    }
                ]
            };

            const searchQuery = {
                $and: [
                    genreQuery,
                    wordQuery
                ],
                index: sortOrder === 1 ? {$gt: cursor} : {$lte: cursor}
            };

            articles = await Article.find(searchQuery)
                .sort({index: 1})
                .limit(limit)
                .lean();

            if (articles.length > 0) {
                console.log(`Найдено ${articles.length} статей по жанрам и словам.`);
                return res.status(200).json({
                                                articles,
                                                cursor: articles[articles.length - 1].index
                                            });
            } else {
                console.log(`Статьи с набором жанров ${singleGenres} и словами ${words.join(', ')} не найдены.`);
                return res.status(404).json({message: 'Статьи по заданным жанрам и словам не найдены.'});
            }
        }

        // Если ни жанров, ни слов не указано
        return res.status(400).json({message: 'Не указаны жанры или слова для поиска.'});

    } catch (error) {
        console.error('Ошибка при получении статей по поиску:', error);
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};


// Всего статей в поиске
export const getTotalArticlesCountByGenresAndWords = async (req: Request,
                                                            res: Response): Promise<Response> => {
    const genres = req.query.genres as string;
    const searchWords = (req.query.s as string) || '';
    const words = searchWords.trim().split(' ').filter(Boolean);
    let query: any = {};

    if (genres) {
        const singleGenres = genres.split(',');
        query = {genres: {$all: singleGenres}};
    }

    if (words.length > 0) {
        query = {
            ...query,
            $or: [
                {
                    title: {
                        $regex: words.join('|'),
                        $options: 'i'
                    }
                },
                {
                    content: {
                        $regex: words.join('|'),
                        $options: 'i'
                    }
                }
            ]
        };
    }

    try {
        const total = await Article.countDocuments(query).lean();
        console.log('Всего статей параметрам запроса:', total)
        return res.status(200).json(total);
    } catch (error) {
        console.error('Ошибка при получении общего количества статей по параметрам поиска:', error);
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};

export const getRandomArticlesList = async (req: Request, res: Response) => {
    try {
        const metadata = await Metadata.findOne();
        const totalArticlesInDb = metadata?.metadata?.totalArticlesCount;


        const maxArticles = Math.min(10, totalArticlesInDb || 0);
        const articlesIndexesSet = new Set<number>();

        while (articlesIndexesSet.size < maxArticles) {
            const randomIndex = Math.floor(Math.random() * totalArticlesInDb);
            articlesIndexesSet.add(randomIndex);

            if (articlesIndexesSet.size >= totalArticlesInDb) {
                break;
            }
        }

        const articlesIndexesArray = Array.from(articlesIndexesSet);
        console.log('Массив индексов случайных статей: ', articlesIndexesArray);

        const randomArticlesList: Array<{ index: number; title: string }> = [];


        for (const articleIndex of articlesIndexesArray) {
            const article = await Article.findOne({index: articleIndex});

            if (article) {
                randomArticlesList.push({
                                            index: article.index,
                                            title: article.title,
                                        });
            }

            if (randomArticlesList.length >= maxArticles) {
                break;
            }
        }

        return res.status(200).json({
                                        message: 'Список случайных статей',
                                        count: randomArticlesList.length,
                                        randomArticlesList
                                    });
    } catch (error) {
        console.error('Ошибка при получении случайных статей:', error);
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};

// Удаление статьи
export const deleteArticleByIndex = async (req: Request, res: Response) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        const articleIndex = Number(req.params.index);
        const decoded = decodeToken(token!);
        const userIndex = Number(decoded.index);
        const userRole = decoded.role;

        const article = await Article.findOne({index: articleIndex});

        if (!article) {
            console.error(`Статья с индексом ${articleIndex} не найдена.`);
            return res.status(404).json({message: 'Статья не найдена.'});
        }

        if (userRole !== 'admin' && userIndex !== article.author.index) {
            console.error(`Ошибка доступа. Пользователь с индексом ${userIndex} не имеет прав для удаления статей.`);
            return res.status(403).json({message: 'Отказано в доступе.'});
        }

        const articleGenres = article.genres;

        const updatePromises = articleGenres.map(genre => {
            return Metadata.findOneAndUpdate(
                {},
                {
                    $inc: {
                        [`metadata.genresCount.${genre}`]: -1
                    },
                    $set: {'metadata.lastUpdated': Date.now()}
                },
                {
                    new: true,
                    upsert: true
                }
            );
        });

        await Promise.all(updatePromises);

        await Metadata.findOneAndUpdate(
            {},
            {
                $inc: {'metadata.totalArticlesCount': -1},
                $set: {'metadata.lastUpdated': Date.now()}
            },
            {new: true}
        );

        await article.deleteOne();

        await User.updateMany(
            {},
            {
                $pull: {
                    favoriteArticles: {index: articleIndex},
                    lastArticles: {index: articleIndex}
                }
            }
        );

        console.log(`Статья под номером ${articleIndex} успешно удалена.`);
        return res.status(200).json({message: `Статья под номером ${articleIndex} успешно удалена.`});

    } catch (error) {
        console.error('Ошибка при удалении статьи:', error);
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
}

// Получение статей в админке
export const getAllArticlesAsAdmin = async (req: Request,
                                            res: Response) => {


    try {
        const limit = Number(req.query.limit);
        const page = Number(req.query.page);
        const token = req.headers['authorization']?.split(' ')[1];
        const role = decodeToken(token!).role;
        const sortBy: keyof IArticle = req.query.sortBy as keyof IArticle;
        const sortIndex = Number(req.query.sortIndex) === 1 ? 1 : -1;

        console.log('Запрос на получение и сортировку статей.')
        if (role !== 'admin') {
            console.warn('Недостаточно прав для получение статей.');
            return res.status(403).json({message: 'Недостаточно прав для загрузки статей'})
        }
        const foundArticles = await Article.find()
            .sort({[sortBy]: sortIndex})
            .skip((page - 1) * limit)
            .limit(limit);
        const articles = foundArticles.map(article => ({
            index: article.index,
            author: article.author,
            title: article.title,
            publishedDate: article.publishedDate,
            characterCount: article.characterCount,
            estimatedReadingTime: article.estimatedReadingTime
        }));
        return res.status(200).json({
                                        message: `Список статей для страницы ${page}`,
                                        articles
                                    });

    } catch (error) {
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};

