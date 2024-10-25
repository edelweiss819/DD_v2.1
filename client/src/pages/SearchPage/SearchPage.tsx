import React, {useDeferredValue, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import MainHeaderLayout
    from '../../layouts/MainHeaderLayout/MainHeaderLayout.tsx';
import MainContentLayout
    from '../../layouts/MainContentLayout/MainContentLayout.tsx';
import Footer from '../../shared/ui/Footer/Footer.tsx';
import Content from '../../shared/ui/Content/Content.tsx';
import {
    useFetchArticlesListByGenreAndWords,
    useFetchTotalArticlesCountByGenreAndWords
} from '../../features/search';
import {
    resetArticlesList,
    setArticlesList, setLastCursor,
    setTotalPages,
} from '../../entities/articles';
import {articlesCountToPagesCount} from '../../shared/utils';

const SearchPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        articlesList,
        searchParams,
        currentPage,
        sortOrder,
        updatedLastCursor,
    } = useSelector((state: RootState) => state.articlesList);

    const {data: response} = useFetchArticlesListByGenreAndWords({
                                                                     page: currentPage | 1,
                                                                     genres: searchParams?.genres,
                                                                     s: searchParams?.s,
                                                                     lastCursor: updatedLastCursor,
                                                                     sortOrder: sortOrder,
                                                                 });
    const {
        data: count,
    } = useFetchTotalArticlesCountByGenreAndWords({
                                                      genres: searchParams?.genres,
                                                      s: searchParams?.s,
                                                  });

    const list = response?.articles;
    const cursor = response?.cursor;

    const deferredSearchParams = useDeferredValue(searchParams);

    useEffect(() => {
        dispatch(resetArticlesList())
    }, [dispatch]);


    useEffect(() => {
        document.title = deferredSearchParams.s
            ? `DD || Поиск: ${deferredSearchParams.s}`
            : `DD || Поиск`;
    }, [deferredSearchParams]);


    useEffect(() => {
        if (count) {
            (dispatch(setTotalPages(articlesCountToPagesCount(count))))
        }

    }, [
                  dispatch,
                  count
              ]);


    useEffect(() => {
        if (list) {
            dispatch(setArticlesList(list));
        }

    }, [
                  dispatch,
                  list,
              ]);

    useEffect(() => {
        if (cursor) {
            dispatch(setLastCursor(cursor));
        }
    }, [
                  dispatch,
                  cursor,
              ]);


    return (
        <>
            <MainHeaderLayout/>
            <Content>
                <MainContentLayout articlesList={articlesList}/>
            </Content>
            <Footer/>
        </>
    );
};

export default SearchPage;
