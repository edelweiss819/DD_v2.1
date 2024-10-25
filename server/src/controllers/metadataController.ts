import Metadata, {IMetadata} from '../models/Metadata';
import Article from '../models/Article';
import {Request, Response} from 'express';

// Получение данных метаданных
export const getMetadata = async (): Promise<IMetadata | null> =>
    Metadata.findOne().catch(error => {
        console.error('Ошибка получения метаданных:', error);
        return null;
    });


// Получение количества статей


export const getArticlesTotalCount = async (req: Request,
                                            res: Response): Promise<void> => {
    try {
        const metadata = await Metadata.findOne();
        const totalArticlesCount = metadata?.metadata['totalArticlesCount'] ?? null;
        if (totalArticlesCount !== null) {
            res.status(200).json(totalArticlesCount);
        } else {
            res.status(404).json({error: 'Метаданные для общего количества статей не найдена.'});
        }
    } catch (error) {
        console.error('Ошибка получения общего количества статей:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};


// Обновление количества статей
export const updateTotalArticlesCount = async (shouldUpdate: boolean): Promise<IMetadata | null> => {
    if (shouldUpdate) {
        try {
            const totalArticlesCount = await Article.countDocuments();
            const timestamp = new Date().getTime();

            const metadata = await Metadata.findOneAndUpdate(
                {},
                {
                    $set: {
                        'metadata.totalArticlesCount': totalArticlesCount,
                        'metadata.lastUpdated': timestamp
                    }
                },
                {
                    upsert: true,
                    new: true
                }
            );
            console.log('Количество статей обновлено. Всего статей в базе:', totalArticlesCount);
            return metadata;
        } catch (error) {
            console.error('Ошибка обновления количества статей:', error);
            return null;
        }
    } else {
        return null;
    }
};

//Обновления статей по жанрам

export const updateGenresCount = async (shouldUpdate: boolean): Promise<IMetadata | null> => {
    if (shouldUpdate) {
        try {
            const articles = await Article.find();
            const genreCounts: Record<string, number> = {};
            articles.forEach(article => {

                const genres = article.genres;

                genres.forEach(genre => {
                    if (genreCounts[genre]) {
                        genreCounts[genre] += 1;
                    } else {
                        genreCounts[genre] = 1;
                    }
                });
            });

            const metadata = await Metadata.findOneAndUpdate(
                {},
                {$set: {'metadata.genresCount': genreCounts}},
                {
                    upsert: true,
                    new: true
                }
            );

            console.log('Количество статей по жанрам обновлено:', genreCounts);
            return metadata;

        } catch (error) {
            console.error('Error updating genres count:', error);
            return null;
        }
    } else {
        console.log('Update not required');
        return null;
    }
};
//Получение количества статей по жанру
export const getArticlesTotalCountByGenre = async (req: Request,
                                                   res: Response): Promise<void> => {


    try {
        const genre = decodeURIComponent(req.params.genre as string);

        console.log('Fetching metadata for total articles count by genre...');


        const metadata = await Metadata.findOne();

        // Извлекаем количество статей
        const totalArticlesCountByGenre = metadata?.metadata.genresCount[`${genre}`] ?? null;
        console.log(`Total articles count by "${genre}":`, totalArticlesCountByGenre);


        if (totalArticlesCountByGenre !== null) {
            res.status(200).json(totalArticlesCountByGenre);
        } else {
            res.status(404).json({error: `Total articles by ${genre} count not found`});
        }
    } catch (error) {
        console.error(`Error fetching total articles count by this genre :`, error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};