import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../model';
import {
    IFetchArticlesListByGenreAndWordsParams
} from '../../../features/search';

export interface IArticlesState {
    articlesList: IArticle[];
    totalPages: number;
    currentPage: number;
    searchParams: IFetchArticlesListByGenreAndWordsParams,
    lastCursor: number;
    updatedLastCursor: number,
    sortOrder: number,
    globalGenres: string[]
}

const initialState: IArticlesState = {
    articlesList: [],
    totalPages: 1,
    currentPage: 1,
    searchParams: {
        page: 1,
    },
    lastCursor: 0,
    updatedLastCursor: 0,
    sortOrder: 1,
    globalGenres: [
        '',
        '',
        '',
        ''
    ],
};


const articlesListSlice = createSlice({
                                          name: 'articlesList',
                                          initialState,
                                          reducers: {
                                              setArticlesList: (state,
                                                                action: PayloadAction<IArticle[]>) => {
                                                  state.articlesList = action.payload;
                                              },
                                              resetArticlesList: (state) => {
                                                  state.articlesList = [];
                                              },
                                              setTotalPages: (state,
                                                              action: PayloadAction<number>) => {
                                                  state.totalPages = action.payload;
                                              },
                                              setCurrentPage: (state,
                                                               action: PayloadAction<number>) => {
                                                  state.currentPage = action.payload;
                                              },
                                              setSearchParams: (state,
                                                                action: PayloadAction<IFetchArticlesListByGenreAndWordsParams>) => {
                                                  state.searchParams = action.payload;
                                              },
                                              resetSearchParams: (state) => {
                                                  state.searchParams = {
                                                      page: 1,
                                                      genres: state.globalGenres.filter(Boolean).join(','),
                                                      s: undefined,
                                                      limit: 10,
                                                      lastCursor: 0,
                                                  }
                                              },
                                              setLastCursor: (state,
                                                              action: PayloadAction<number>) => {
                                                  state.lastCursor = action.payload;
                                              },
                                              updateLastCursor: (state,
                                                                 action: PayloadAction<number>) => {
                                                  state.updatedLastCursor = action.payload;
                                              },
                                              setSortOrder: (state,
                                                             action: PayloadAction<number>) => {
                                                  state.sortOrder = action.payload;
                                              },
                                              setGlobalGenres(state,
                                                              action: PayloadAction<string[]>) {
                                                  state.globalGenres = action.payload;
                                                  console.log(state.globalGenres)
                                              },
                                              resetGlobalGenres(state) {
                                                  state.globalGenres = [
                                                      '',
                                                      '',
                                                      '',
                                                      ''
                                                  ];
                                              }
                                          }
                                      });

export const {
    setArticlesList,
    resetArticlesList,
    setTotalPages,
    setCurrentPage,
    setSearchParams,
    resetSearchParams,
    setLastCursor,
    updateLastCursor,
    setSortOrder,
    setGlobalGenres,
    resetGlobalGenres
} = articlesListSlice.actions;

export default articlesListSlice.reducer;
