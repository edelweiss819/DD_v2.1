import {useMutation, useQueryClient} from '@tanstack/react-query';
import {IPatchUserDataRes, IPatchUserDataReq, patchUserData} from '../api';

export const usePatchUserData = () => {
    const queryClient = useQueryClient();
    return useMutation<IPatchUserDataRes, Error, IPatchUserDataReq>({
                                                                        mutationKey: ['patchUserData'],
                                                                        mutationFn: ({
                                                                                         index,
                                                                                         token,
                                                                                         updatedData,
                                                                                     }: IPatchUserDataReq) => patchUserData({
                                                                                                                                token,
                                                                                                                                index,
                                                                                                                                updatedData,
                                                                                                                            }),
                                                                        onSuccess: () => {
                                                                            queryClient.invalidateQueries({queryKey: ['fetchAllUsers']});
                                                                            queryClient.invalidateQueries({queryKey: ['fetchUser']})
                                                                        }
                                                                    })
}