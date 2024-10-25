import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import Input from '../../../../shared/ui/Forms/Input/Input.tsx';
import Button from '../../../../shared/ui/Button/Button.tsx';
import {
    ButtonColor,
    ButtonType
} from '../../../../shared/ui/Button/Button.enums.ts';
import styles from './SearchForm.module.scss';
import {IFetchArticlesListByGenreAndWordsParams} from '../../api';
import {useFetchArticlesListByGenreAndWords} from '../../hooks';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store.ts';
import {
    resetGlobalGenres,
    setArticlesList,
    setCurrentPage,
    setGlobalGenres,
    setLastCursor,
    setSearchParams,
    setSortOrder,
    updateLastCursor,
} from '../../../../entities/articles';
import BaseSelect
    from '../../../../shared/ui/Selects/BaseSelects/BaseSelect.tsx';
import {GENRES} from '../../../../constants';
import {useLocation, useNavigate} from 'react-router';
import {AxiosError} from 'axios';

interface ErrorResponse {
    message: string;
}

export interface FormValues {
    'search-input': string;
}

export interface GenreOption {
    value: string;
    label: string;
}

const SearchForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {globalGenres} = useSelector((state: RootState) => state.articlesList);
    const {
        register,
        handleSubmit
    } = useForm<FormValues>();
    const navigate = useNavigate();
    const location = useLocation();
    const [params, setParams] = useState<IFetchArticlesListByGenreAndWordsParams>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {
        data: foundArticleList,
        error
    } = useFetchArticlesListByGenreAndWords(params!);

    useEffect(() => {
        if (location.pathname !== '/search') {
            dispatch(resetGlobalGenres());
        }
    }, [
                  dispatch,
                  location.pathname
              ]);

    useEffect(() => {
        if (foundArticleList) {
            dispatch(setArticlesList(foundArticleList.articles));
            setErrorMessage(null);
        } else if (error) {
            const response = (error as AxiosError).response;
            if (response && response.data && typeof response.data === 'object' && 'message' in response.data) {
                const message = (response.data as ErrorResponse).message;
                setErrorMessage(message);
            } else {
                return;
            }
        }
    }, [
                  dispatch,
                  foundArticleList,
                  error
              ]);

    const genreOptions = (currentGenre: string): GenreOption[] => {
        const entireGenres: GenreOption[] = [
            {
                value: '',
                label: '—'
            },
            ...Object.keys(GENRES).map((key) => ({
                value: key,
                label: GENRES[key],
            })),
        ];
        const filteredGenres = entireGenres.filter(
            (genre) => genre.value === '' || genre.value === currentGenre || !globalGenres.includes(genre.value)
        );

        return filteredGenres;
    };

    const onSubmit = (data: FormValues) => {
        const newParams: IFetchArticlesListByGenreAndWordsParams = {
            page: 1,
            genres: globalGenres.filter(Boolean).join(','),
            s: data['search-input'].toString(),
            limit: 10,
            lastCursor: 0,
        };

        if (globalGenres.filter(Boolean).length === 0 && newParams.s === '') {
            navigate('/');
        } else {
            setParams(newParams);
            dispatch(setCurrentPage(1));
            dispatch(setSearchParams(newParams));
            dispatch(setLastCursor(0));
            dispatch(updateLastCursor(0));
            dispatch(setSortOrder(1));
            if (location.pathname !== '/search') {
                navigate('/search');
            }
        }
    };

    return (
        <div className={styles['form-container']}>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={styles['search-form']}>
                <Input
                    type={'text'}
                    formType="input-search"
                    register={register}
                    name="search-input"
                    required={false}
                    placeholder="Введите запрос.."
                />
                <Button text="Поиск" color={ButtonColor.DARK_BLUE}
                        type={ButtonType.SEARCH}
                        onClick={handleSubmit(onSubmit)}/>
            </form>
            <div className={styles['genres-container']}>
                <BaseSelect
                    key={`genre-${0}`}
                    options={genreOptions(globalGenres[0] || '')}
                    selectedValue={globalGenres[0] || ''}
                    type={'select-search-options'}
                    onChange={(value) =>
                        dispatch(setGlobalGenres([
                                                     value,
                                                     globalGenres[1],
                                                     globalGenres[2],
                                                     globalGenres[3]
                                                 ]))
                    }
                />
                <BaseSelect
                    key={`genre-${1}`}
                    options={genreOptions(globalGenres[1] || '')}
                    selectedValue={globalGenres[1] || ''}
                    type={'select-search-options'}
                    onChange={(value) =>
                        dispatch(setGlobalGenres([
                                                     globalGenres[0],
                                                     value,
                                                     globalGenres[2],
                                                     globalGenres[3]
                                                 ]))
                    }
                />
                <BaseSelect
                    key={`genre-${2}`}
                    options={genreOptions(globalGenres[2] || '')}
                    selectedValue={globalGenres[2] || ''}
                    type={'select-search-options'}
                    onChange={(value) =>
                        dispatch(setGlobalGenres([
                                                     globalGenres[0],
                                                     globalGenres[1],
                                                     value,
                                                     globalGenres[3]
                                                 ]))
                    }
                />
                <BaseSelect
                    key={`genre-${3}`}
                    options={genreOptions(globalGenres[3] || '')}
                    selectedValue={globalGenres[3] || ''}
                    type={'select-search-options'}
                    onChange={(value) =>
                        dispatch(setGlobalGenres([
                                                     globalGenres[0],
                                                     globalGenres[1],
                                                     globalGenres[2],
                                                     value
                                                 ]))
                    }
                />
            </div>
            {errorMessage && (
                <div className={styles['error']}>
                    <span className={styles['error-text']}>{errorMessage}</span>
                </div>
            )}
        </div>
    );
};

export default SearchForm;
