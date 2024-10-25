import {Router} from 'express';
import {
    getMetadata, getArticlesTotalCount,
    updateTotalArticlesCount, updateGenresCount, getArticlesTotalCountByGenre
} from '../controllers/metadataController';


const router = Router();

router.get('/metadata', getMetadata);
router.get('/metadata/getArticlesTotalCount', getArticlesTotalCount);
router.get('/metadata/updateTotalArticles', updateTotalArticlesCount);
router.get('/metadata/updateGenresCount', updateGenresCount);
router.get('/metadata/getArticlesTotalCountByGenre/:genre', getArticlesTotalCountByGenre);


export default router;
