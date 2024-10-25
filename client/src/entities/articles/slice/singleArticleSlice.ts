import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../model';

export interface ISingleArticleState {
    singleArticle: Partial<IArticle>;
    currentArticleIndex: number;
}

const initialState: ISingleArticleState = {
    singleArticle: {
        title: '',
        genres: [],
        content: '',
        index: 0,
        publishedDate: 0,
        characterCount: 0,
        estimatedReadingTime: 0,
        author: {
            index: 0,
            name: '',
        },
    },
    currentArticleIndex: 0,
};

const singleArticleSlice = createSlice({
                                           name: 'singleArticle',
                                           initialState,
                                           reducers: {
                                               setSingleArticle: (
                                                   state,
                                                   action: PayloadAction<IArticle>
                                               ) => {
                                                   state.singleArticle = action.payload;
                                               },

                                               setCurrentArticleIndex: (state,
                                                                        action: PayloadAction<number>) => {
                                                   state.currentArticleIndex = action.payload;
                                               },
                                           },
                                       });

export const {
    setSingleArticle,
    setCurrentArticleIndex,
} = singleArticleSlice.actions;
export default singleArticleSlice.reducer;
