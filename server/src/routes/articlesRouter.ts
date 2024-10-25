import {Router} from 'express';
import {
    deleteArticleByIndex,
    getAllArticles, getAllArticlesAsAdmin,
    getArticleByIndex,
    getArticlesByGenreAndWords,
    getArticlesListByGenre, getRandomArticlesList,
    getTotalArticlesCountByGenresAndWords,
} from '../controllers/articlesController';
import {authenticateToken} from '../middlewares/authMiddleware';


const router = Router();

router.get('/articles', getAllArticles);
router.get('/articles/admin', authenticateToken(['admin']), getAllArticlesAsAdmin)
router.get('/articles/:index', getArticleByIndex);
router.get('/articles/search/getArticlesListByGenre/:genre', getArticlesListByGenre);
router.get('/articles/search/getArticlesByGenreAndWords', getArticlesByGenreAndWords);
router.get('/articles/search/getTotalArticlesCountByGenresAndWords', getTotalArticlesCountByGenresAndWords);
router.get('/articles/randomArticles/getRandomArticlesList', getRandomArticlesList);
router.delete('/articles/:index', authenticateToken([
                                                        'admin',
                                                        'user'
                                                    ]), deleteArticleByIndex);


export default router;