import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteUser, IDeleteUserReq, IDeleteUserRes} from '../api';

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation<IDeleteUserRes, Error, IDeleteUserReq>({
                                                                  mutationKey: ['deleteSingleArticleByIndex'],
                                                                  mutationFn: ({
                                                                                   index,
                                                                                   token
                                                                               }: IDeleteUserReq) =>
                                                                      deleteUser({
                                                                                     index,
                                                                                     token
                                                                                 }),
                                                                  onSuccess: () => {
                                                                      queryClient.invalidateQueries({queryKey: ['fetchAllUsers']});
                                                                      queryClient.invalidateQueries({queryKey: ['fetchUser']});

                                                                  },
                                                                  onError: (error) => {
                                                                      console.error('Ошибка при удалении статьи:', error);
                                                                  }
                                                              });
};
