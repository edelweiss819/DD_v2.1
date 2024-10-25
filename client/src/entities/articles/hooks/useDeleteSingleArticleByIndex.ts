import {useMutation} from '@tanstack/react-query';
import {
    deleteSingleArticleByIndex,
    IDeleteSingleArticleByIndexReq,
    IDeleteSingleArticleByIndexRes
} from '../api';
import {useQueryClient} from '@tanstack/react-query';

export const useDeleteSingleArticleByIndex = () => {
    const queryClient = useQueryClient();

    return useMutation<IDeleteSingleArticleByIndexRes, Error, IDeleteSingleArticleByIndexReq>({
                                                                                                  mutationKey: ['deleteSingleArticleByIndex'],
                                                                                                  mutationFn: ({
                                                                                                                   index,
                                                                                                                   token
                                                                                                               }: IDeleteSingleArticleByIndexReq) =>
                                                                                                      deleteSingleArticleByIndex({
                                                                                                                                     index,
                                                                                                                                     token
                                                                                                                                 }),
                                                                                                  onSuccess: () => {
                                                                                                      queryClient.invalidateQueries({queryKey: ['fetchArticlesList']});
                                                                                                      queryClient.invalidateQueries({queryKey: ['fetchArticlesListByGenre']});
                                                                                                      queryClient.invalidateQueries({queryKey: ['favArticlesList']});
                                                                                                      queryClient.invalidateQueries({queryKey: ['fetchRandomArticlesList']});
                                                                                                      queryClient.invalidateQueries({queryKey: ['fetchSingleArticleByIndex']});
                                                                                                      queryClient.invalidateQueries({queryKey: ['fetchUserLastArticlesList']});
                                                                                                      queryClient.invalidateQueries({queryKey: ['fetchArticlesListByGenreAndWords']});
                                                                                                      queryClient.invalidateQueries({queryKey: ['fetchTotalArticlesCount']});
                                                                                                      queryClient.invalidateQueries({queryKey: ['fetchTotalArticlesCountByGenre']});
                                                                                                      queryClient.invalidateQueries({queryKey: ['fetchAllArticlesAsAdmin']});
                                                                                                  },
                                                                                                  onError: (error) => {
                                                                                                      console.error('Ошибка при удалении статьи:', error);
                                                                                                  }
                                                                                              });
};
