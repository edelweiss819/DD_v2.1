import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import articlesRouter from './routes/articlesRouter';
import metadataRouter from './routes/metadataRouter';
import {
    updateGenresCount,
    updateTotalArticlesCount
} from './controllers/metadataController';
import {UPDATE_GENRES_COUNT, UPDATE_TOTAL_ARTICLES} from './constants';
import usersRouter from './routes/usersRouter';
import authRouter from './routes/authRouter';
import dotenv from 'dotenv';
import googleAuthRouter from './routes/googleAuthRouter';
import session from 'express-session';
import passport from 'passport';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());
app.use(cors());

app.use(session({
                    secret: process.env.SESSION_SECRET!,
                    resave: false,
                    saveUninitialized: true,
                }));


app.use(passport.initialize());
app.use(passport.session());

app.use(articlesRouter);
app.use(metadataRouter);
app.use(usersRouter);
app.use(authRouter);
app.use(googleAuthRouter)

const uri = process.env.MONGODB_URI;


const startServer = async () => {
    try {
        await mongoose.connect(uri!);
        await mongoose.connection.db.admin().command({ping: 1});
        console.log('Pinged your deployment. You successfully connected to MongoDB!');

        await updateTotalArticlesCount(UPDATE_TOTAL_ARTICLES);
        await updateGenresCount(UPDATE_GENRES_COUNT);

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (err) {
        console.error('Error starting the server:', err);
    }
};

startServer().catch(err => {
    console.error('Failed to start server:', err);
});
