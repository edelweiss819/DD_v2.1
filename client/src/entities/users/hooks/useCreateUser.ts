import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {CreateUserResponse, createUser} from '../api';


interface Error {
    status: number;
    message: string;
}

export const useCreateUser = (
    navigate: (path: string) => void,
    onError?: (error: Error) => void
): UseMutationResult<{
    status: number;
    message: any;
} | undefined, Error, CreateUserResponse> => {
    return useMutation({
                           mutationKey: ['createUser'],
                           mutationFn: (userData: CreateUserResponse) => createUser(userData),
                           onSuccess: () => {
                               navigate('/sign_in');
                           },
                           onError: (error) => {
                               console.error('Ошибка при регистрации пользователя:', error);
                               if (error.status === 409) {
                                   onError && onError({
                                                          status: error.status,
                                                          message: error.message
                                                      });
                               } else {
                                   onError && onError(error);
                               }
                           },
                       });
};
