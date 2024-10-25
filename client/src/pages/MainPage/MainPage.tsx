import React, {useEffect} from 'react';
import MainContentLayout
    from '../../layouts/MainContentLayout/MainContentLayout.tsx';
import Footer from '../../shared/ui/Footer/Footer.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {useFetchArticlesList} from '../../entities/articles';
import {
    resetSearchParams,
    setArticlesList,
    setTotalPages
} from '../../entities/articles';
import {articlesCountToPagesCount} from '../../shared/utils';
import {useFetchTotalArticlesCount} from '../../features/pagination';
import Content from '../../shared/ui/Content/Content.tsx';
import MainHeaderLayout
    from '../../layouts/MainHeaderLayout/MainHeaderLayout.tsx';
import {useLocation} from 'react-router';
import {setAuthorized, setToken} from '../../entities/users';
import {useNavigate} from 'react-router-dom';


const MainPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        document.title = 'Desire Diaries';
    }, []);

    const {
        articlesList,
        currentPage,
    } = useSelector((state: RootState) => state.articlesList);


    const {data: defaultList} = useFetchArticlesList(currentPage);
    const {data: defaultTotalCount} = useFetchTotalArticlesCount();


    useEffect(() => {
        dispatch(resetSearchParams());
        if (defaultList) {
            dispatch(setArticlesList(defaultList));
            defaultTotalCount && dispatch(setTotalPages(articlesCountToPagesCount(defaultTotalCount)));
        }
    }, [
                  dispatch,
                  defaultList,
                  defaultTotalCount,
              ]);


    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token) {
            dispatch(setToken(token));
            dispatch(setAuthorized(true));
            navigate('/');
        }

    }, [
                  dispatch,
                  location.search,
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

export default MainPage;
