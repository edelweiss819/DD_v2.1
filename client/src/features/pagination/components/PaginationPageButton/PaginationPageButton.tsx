import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    setCurrentPage
} from '../../../../entities/articles';
import classNames from 'classnames';
import styles from './PaginationPageButton.module.scss'
import {AppDispatch, RootState} from '../../../../store/store.ts';
import {scrollToElement} from '../../../../shared/utils';
import {PaginationProps} from '../Pagination.tsx';


interface PaginationPageButtonProps extends PaginationProps {
    page: number;
    activePage: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
    onClick?: () => void
}

const PaginationPageButton: React.FC<PaginationPageButtonProps> = ({
                                                                       page,
                                                                       setActivePage,
                                                                       scrollTo
                                                                   }) => {

    const dispatch = useDispatch<AppDispatch>();
    const {
        currentPage,
        lastCursor
    } = useSelector((state: RootState) => state.articlesList);


    const handleClick = () => {
        if (lastCursor) {
            return;
        } else {
            dispatch(setCurrentPage(page));
            setActivePage(page);
            (scrollTo && scrollToElement(scrollTo));
        }
    };


    const removePointer = classNames({
                                         [styles['remove-pointer']]: location.pathname === '/search'
                                     })

    const activePageButtonClass = classNames({
                                                 [styles['active-page-button']]: page === currentPage,

                                             })

    const pageButtonClass = classNames(
        activePageButtonClass,
        removePointer
    )

    return (
        <span className={pageButtonClass} onClick={handleClick}>
            {page}
        </span>
    );
};

export default PaginationPageButton;
