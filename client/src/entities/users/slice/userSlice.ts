import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    IUser,
    LastArticlesList
} from '../model';
import Cookies from 'js-cookie';

export interface UserState extends IUser {
    isAuthorized: boolean;
    token?: string;
}


const loadUserFromCookies = () => {
    return {
        token: Cookies.get('token'),
    };
};


const initialState: UserState = {
    ...loadUserFromCookies(),
    isAuthorized: JSON.parse(localStorage.getItem('isAuthorized') || 'false'),
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    role: undefined,
    registrationDate: undefined,
    index: undefined,
    favoriteArticles: [],
    lastArticles: [],

};

const userSlice = createSlice({
                                  name: 'userSlice',
                                  initialState,
                                  reducers: {
                                      setUser: (state,
                                                action: PayloadAction<Partial<IUser>>) => {
                                          const user = action.payload;

                                          state.firstName = user.firstName ?? state.firstName;
                                          state.lastName = user.lastName ?? state.lastName;
                                          state.email = user.email ?? state.email;
                                          state.role = user.role ?? state.role;
                                          state.registrationDate = user.registrationDate ?? state.registrationDate;
                                          state.favoriteArticles = user.favoriteArticles ?? state.favoriteArticles;
                                          state.lastArticles = user.lastArticles ?? state.lastArticles;


                                      },
                                      setAuthorized: (state,
                                                      action: PayloadAction<boolean>) => {
                                          state.isAuthorized = action.payload;
                                          localStorage.setItem('isAuthorized', JSON.stringify(state.isAuthorized));
                                      },
                                      setToken: (state,
                                                 action: PayloadAction<string>) => {
                                          state.token = action.payload;
                                          Cookies.set('token', state.token, {
                                              expires: 7,
                                              secure: true
                                          });
                                      },
                                      removeToken: () => {
                                          Cookies.remove('token');
                                      },
                                      removeUser: (state) => {
                                          state.firstName = '';
                                          state.lastName = '';
                                          state.email = '';
                                          state.token = undefined;
                                          state.role = undefined
                                          state.registrationDate = 0
                                          state.favoriteArticles = []

                                          Cookies.remove('token');

                                          state.isAuthorized = false;
                                          localStorage.removeItem('isAuthorized');
                                      },
                                      setFavoriteArticles: (state,
                                                            action: PayloadAction<IUser['favoriteArticles']>) => {
                                          state.favoriteArticles = action.payload;
                                      },
                                      setUserLastArticlesList: (state,
                                                                action: PayloadAction<LastArticlesList>) => {
                                          state.lastArticles = action.payload;
                                      }

                                  },
                              });

export const {
    setUser,
    setAuthorized,
    setToken,
    removeToken,
    removeUser,
    setFavoriteArticles,
    setUserLastArticlesList,
} = userSlice.actions;

export default userSlice.reducer;
