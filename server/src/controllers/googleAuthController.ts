import {Response, Request} from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import User, {IUser} from '../models/User';
import {createUserToken} from '../utils';

dotenv.config();

passport.use(new GoogleStrategy({
                                    clientID: process.env.GOOGLE_CLIENT_ID!,
                                    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                                    callbackURL: `${process.env.BACK_END_BASE_ENDPOINT}/auth/google/callback`,
                                }, async (accessToken, refreshToken, profile,
                                          done) => {
    try {

        let user;

        if (profile.emails && profile.emails.length > 0) {
            user = await User.findOne({email: profile.emails[0].value});

            let firstName;
            let lastName;

            if (profile.name) {
                const {
                    familyName,
                    givenName
                } = profile.name;
                firstName = givenName || familyName || profile.displayName;
                lastName = familyName ? familyName : givenName ? givenName : profile.displayName;
            } else {
                firstName = profile.displayName;
                lastName = profile.displayName;
            }

            let avatar = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : 'defaultAvatar';

            if (!user) {
                user = new User({
                                    googleId: profile.id,
                                    firstName: firstName,
                                    lastName: lastName,
                                    email: profile.emails[0].value,
                                    registrationDate: Math.floor(Date.now() / 1000),
                                    avatar: avatar
                                });

                const maxIndexUser = await User.findOne().sort('-index').lean().exec();
                user.index = maxIndexUser ? (maxIndexUser.index || 0) + 1 : 1;
                await user.save();
            }

            return done(null, user);
        } else {
            return done(new Error('Email не найден в профиле Google.'), undefined);
        }
    } catch (error: any) {
        return done(error as Error, undefined);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: Partial<IUser> | null, done) => {
    done(null, user);
});

export const googleAuthenticate = (req: Request, res: Response) => {
    passport.authenticate('google', {
        scope: [
            'profile',
            'email'
        ]
    })(req, res);
};

export const googleCallback = (req: Request, res: Response) => {
    passport.authenticate('google', {failureRedirect: process.env.FRONT_END_BASE_ENDPOINT}, async (err,
                                                                                                   user) => {
        if (err) {
            return res.status(500).json({error: 'Ошибка аутентификации.'});
        }

        if (!user) {
            return res.redirect(process.env.FRONT_END_BASE_ENDPOINT!);
        }

        try {
            const token = createUserToken({
                                              index: user.index,
                                              role: user.role
                                          });
            res.redirect(`${process.env.FRONT_END_BASE_ENDPOINT}?token=${token}`);
        } catch (error) {
            return res.status(500).json({error: 'Ошибка при создании токена.'});
        }
    })(req, res);
};


