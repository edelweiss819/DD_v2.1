import {Router} from 'express';
import {
    googleAuthenticate,
    googleCallback
} from '../controllers/googleAuthController';

const router = Router();

router.get('/auth/google', googleAuthenticate);
router.get('/auth/google/callback', googleCallback);

export default router;
