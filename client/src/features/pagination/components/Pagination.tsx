import React, {useState, useEffect} from 'react';
import styles from './Pagination.module.scss';
import PaginationPageButton
    from './PaginationPageButton/PaginationPageButton.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store.ts';
import {
    setCurrentPage, setSortOrder, updateLastCursor
} from '../../../entities/articles';
import {arrayRange} from '../../../shared/utils';
import classNames from 'classnames';
import {scrollToElement} from '../../../shared/utils';

export interface PaginationProps {
    scrollTo?: 'main'
}


const Pagination: React.FC<PaginationProps> = ({scrollTo}) => {

    const {
        totalPages,
        currentPage,
        lastCursor
    } = useSelector((state: RootState) => state.articlesList);
    const [activePage, setActivePage] = useState<number>(currentPage);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setActivePage(currentPage);
        const pages = generatePages(currentPage, totalPages);
        setPageNumbers(pages);
    }, [
                  currentPage,
                  totalPages
              ]);


    const handleClickPrev = () => {
        if (lastCursor) {
            const newActivePage = activePage - 1;
            dispatch(setSortOrder(-1));
            setActivePage(newActivePage);
            dispatch(setCurrentPage(newActivePage));
            (scrollTo && scrollToElement(scrollTo));
        } else if (activePage < totalPages) {
            const newActivePage = activePage - 1;
            setActivePage(newActivePage);
            dispatch(setCurrentPage(newActivePage));
            (scrollTo && scrollToElement(scrollTo));
        }
    }

    const handleClickNext = () => {
        if (lastCursor) {
            const newActivePage = activePage + 1;
            dispatch(setSortOrder(1));
            setActivePage(newActivePage);
            dispatch(setCurrentPage(newActivePage));
            (scrollTo && scrollToElement(scrollTo));
            dispatch(updateLastCursor(lastCursor));
        } else if (activePage < totalPages) {
            const newActivePage = activePage + 1;
            setActivePage(newActivePage);
            dispatch(setCurrentPage(newActivePage));
            (scrollTo && scrollToElement(scrollTo));
        }
    }

    const generatePages = (currentPage: number,
                           totalPages: number): number[] => {
        const pages: number[] = [];

        if (totalPages <= 6) {
            pages.push(...arrayRange(1, totalPages));
        } else {
            // Логика для отображения первых трех страниц при currentPage = 1
            if (currentPage === 1) {
                pages.push(1, 2, 3);
                if (totalPages > 3) pages.push(-1, totalPages);
            } // Логика для отображения последних трех страниц при currentPage === totalPage
            else if (currentPage === totalPages) {
                pages.push(1, -1, totalPages - 3, totalPages - 2, totalPages)
            } else {
                // Добавляет в диапазон либо 1, либо предыдущий номер страницы
                // currentPage = 3 , => pages = [2,3]
                const startPage = Math.max(1, currentPage - 1);
                // Добавляет в диапазон либо последнюю страницу, либо следующий номер страницы
                // currentPage = 3, pages = [2,3], =>  [2,3,4]
                const endPage = Math.min(totalPages, currentPage + 1);
                // Проверяет есть ли в диапазоне первая страница и добавляет, если нет
                // currentPage = 3, pages = [2,3,4], => [1,2,3,4]
                if (startPage > 1) pages.push(1);
                // Проверяет нужен ли добавить геп, 2 это количество элементов между которыми его нужно ставить
                // currentPage = 3, pages = [1,2,3,4] => [1,-1,2,3,4]
                if (startPage >= 2) pages.push(-1);
                // Тут собственно уже создается наш диапазон, потому что фактически в нем сейчас только [1,-1]
                // currentPage = 3, pages = [1,2,3,4] => [1,-1,2,3,4]
                pages.push(...arrayRange(startPage, endPage));
                // Проверяет нужен ли добавить геп, 2 это количество элементов между которыми его нужно ставить
                // currentPage = 3, pages = [1,-1,2,3,4] => [1,-1,2,3,4,-1]
                if (endPage < totalPages - 1) pages.push(-1);
                // Проверяет нужно ли добавлять последнюю страницу
                // currentPage = 3, totalPages = 1623,  pages = [1,-1,2,3,4,-1, 1623]
                if (endPage < totalPages) pages.push(totalPages);
            }
        }
        return pages;
    }


    const prevCursorClass = classNames(styles['pagination-prev'], {
        [styles.hidden]: currentPage === 1,
    })
    const nextCursorClass = classNames(styles['pagination-next'], {
        [styles.hidden]: currentPage === totalPages,
    })

    return (
        <div className={styles['pagination-container']}>
            <nav className={styles['pagination']}>
                {(totalPages > 1) && <span
					onClick={handleClickPrev}
					className={prevCursorClass}
				>
                    <span
						className={styles['pagination-prev-symbol']}>&#60;</span> Prev
                </span>
                }

                {pageNumbers.map((page, index) => {

                    // Рендерит геп
                    if (page === -1) {
                        return (
                            <span key={`gap-${index}`}
                                  className={styles['pagination-gap']}> ... </span>
                        );
                    }
                    return (
                        <PaginationPageButton
                            page={page}
                            activePage={activePage}
                            setActivePage={setActivePage}
                            scrollTo={scrollTo}
                            key={`page-${page}-${index}`}
                        />
                    );
                })}

                {(totalPages > 1) && <span
					onClick={handleClickNext}
					className={nextCursorClass}
				>
                    Next <span
					className={styles['pagination-next-symbol']}>&#62;</span>
                </span>}
            </nav>
        </div>
    );
};

export default Pagination;
