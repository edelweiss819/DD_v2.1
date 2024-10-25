import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store.ts';
import Button from '@mui/material/Button';
import {timestampToLocalDate} from '../../../../shared/utils';
import {
    useDeleteSingleArticleByIndex,
    useFetchAllArticlesAsAdmin
} from '../../../../entities/articles';
import TablePagination from '@mui/material/TablePagination';
import PageLoader
    from '../../../../shared/ui/Loaders/PageLoader/PageLoader.tsx';
import {useNavigate} from 'react-router-dom';
import {useFetchTotalArticlesCount} from '../../../../features/pagination';

export interface IColumnsProps {
    handleHeaderClick: (headerField: string) => void;
    handleTitleCellClick: (articleIndex: number) => void;
    handleAuthorCellClick: (authorIndex: number) => void;
    handleDeleteButtonClick: (index: string) => void;
    sortIndex: number;
}

const columns = ({
                     handleHeaderClick,
                     sortIndex,
                     handleTitleCellClick,
                     handleAuthorCellClick,
                     handleDeleteButtonClick,

                 }: IColumnsProps): GridColDef[] => [
    {
        field: 'index',
        headerName: 'Index',
        width: 70,
        editable: false,
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
            <div onClick={() => handleHeaderClick('index')}
                 style={{cursor: 'pointer'}}>
                Index {sortIndex === 1 ? '↑' : '↓'}
            </div>
        ),
    },
    {
        field: 'title',
        headerName: 'Название статьи',
        flex: 1,
        editable: false,
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
            <div onClick={() => handleHeaderClick('title')}
                 style={{cursor: 'pointer'}}>
                Название статьи {sortIndex === 1 ? '↑' : '↓'}
            </div>
        ),
        renderCell: (params) => (
            <div
                style={{
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    padding: '8px',
                    lineHeight: '1.2',
                    cursor: 'pointer',
                }}
                onClick={() => handleTitleCellClick(params.row.index)}
            >
                {params.value}
            </div>
        ),
    },
    {
        field: 'author',
        headerName: 'Автор',
        flex: 1,
        editable: false,
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
            <div onClick={() => handleHeaderClick('author')}
                 style={{cursor: 'pointer'}}>
                Автор {sortIndex === 1 ? '↑' : '↓'}
            </div>
        ),
        renderCell: (params) => {
            return <div style={{cursor: 'pointer'}}
                        onClick={() => handleAuthorCellClick(params.value.index)}>
                {params.value.name}
            </div>
        }
    },
    {
        field: 'publishedDate',
        headerName: 'Дата публикации',
        flex: 1,
        editable: false,
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
            <div onClick={() => handleHeaderClick('publishedDate')}
                 style={{cursor: 'pointer'}}>
                Дата публикации {sortIndex === 1 ? '↑' : '↓'}
            </div>
        ),
        renderCell: (params) =>
            <span>{timestampToLocalDate(params.value)}</span>,
    },
    {
        field: 'estimatedReadingTime',
        headerName: 'Время чтения',
        flex: 1,
        editable: false,
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
            <div onClick={() => handleHeaderClick('estimatedReadingTime')}
                 style={{cursor: 'pointer'}}>
                Время чтения {sortIndex === 1 ? '↑' : '↓'}
            </div>
        ),
        renderCell: (params) => <span>{params.value} минут</span>,
    },
    {
        field: 'characterCount',
        headerName: 'Количество символов',
        flex: 1,
        editable: false,
        disableColumnMenu: true,
        sortable: false,
        renderHeader: () => (
            <div onClick={() => handleHeaderClick('characterCount')}
                 style={{cursor: 'pointer'}}>
                Количество символов {sortIndex === 1 ? '↑' : '↓'}
            </div>
        ),
    },
    {
        field: 'control',
        headerName: '',
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteButtonClick(params.row.index)}
                size="small"
            >
                Удалить
            </Button>
        ),
    }
];

const AdminPanelPageContentArticlesControl: React.FC = () => {
    const {token} = useSelector((state: RootState) => state.user);
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(25);
    const [sortBy, setSortBy] = useState<string>('index');
    const [sortIndex, setSortIndex] = useState<number>(1);
    const navigate = useNavigate();
    const {mutate} = useDeleteSingleArticleByIndex();
    const {data: totalArticlesCount} = useFetchTotalArticlesCount();
    const {
        data,
        isLoading,
        error
    } = useFetchAllArticlesAsAdmin({
                                       token: token!,
                                       page: page + 1,
                                       limit,

                                       sortBy: sortBy,
                                       sortIndex: sortIndex,
                                   });

    const articles = data?.articles;


    if (isLoading) {
        return <PageLoader/>;
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }
    const handleDeleteButtonClick = (index: string) => {
        mutate({
                   token: token!,
                   index,
               });
    };

    const handleHeaderClick = (headerField: string) => {
        setSortIndex((prev) => (prev === 1 ? -1 : 1));
        setPage(0);
        setSortBy(headerField);
    };

    const handleTitleCellClick = (articleIndex: number) => {
        navigate(`/articles/${articleIndex}`);
    };

    const handleAuthorCellClick = (authorIndex: number) => {
        navigate(`/user/${authorIndex}`);
    }


    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null,
                              newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getRowHeight = () => {
        return 80
    }


    const rows = articles?.map((article) => ({
        id: article?.index,
        index: article?.index,
        author: article?.author,
        title: article?.title,
        publishedDate: article?.publishedDate,
        estimatedReadingTime: article?.estimatedReadingTime,
        characterCount: article?.characterCount,
    })) || [];

    return (
        <Paper sx={{
            paddingX: 1,
            paddingY: 1,
            marginX: 3,
            marginY: 3
        }}>
            <style>
                {`
                    .MuiDataGrid-footerContainer {
                        display: none; 
                    }
                `}
            </style>
            <DataGrid
                rows={rows}
                columns={columns({
                                     handleHeaderClick,
                                     handleTitleCellClick,
                                     handleAuthorCellClick,
                                     handleDeleteButtonClick,
                                     sortIndex
                                 })}
                disableRowSelectionOnClick
                getRowHeight={getRowHeight}
                sx={{paddingY: 1}}
            />
            <TablePagination
                component="div"
                count={totalArticlesCount || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={limit}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[
                    25,
                ]}
            />
        </Paper>
    );
};

export default AdminPanelPageContentArticlesControl;
