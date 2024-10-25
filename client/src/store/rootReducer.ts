import {combineReducers} from '@reduxjs/toolkit';
import articlesListSlice from '../entities/articles/slice/articlesListSlice.ts';
import singleArticleSlice
    from '../entities/articles/slice/singleArticleSlice';
import userSlice from '../entities/users/slice/userSlice.ts';

const rootReducer = combineReducers({
                                        singleArticle: singleArticleSlice,
                                        articlesList: articlesListSlice,
                                        user: userSlice,
                                    });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
