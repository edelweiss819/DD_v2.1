import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {auth, AuthResponse, AuthResult} from '../api';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store';
import {setAuthorized, setToken} from '../../../entities/users';

interface AuthSuccessResponse {
    token: string;
}

interface Error {
    message: string;
    error: string;
    status?: number;
}

export const useAuth = (
    navigate: (path: string) => void,
    onSuccess?: (data: AuthSuccessResponse) => void,
    onError?: (error: Error) => void
): UseMutationResult<AuthResult, Error, AuthResponse> => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation<AuthResult, Error, AuthResponse>({
                                                            mutationKey: ['auth'],
                                                            mutationFn: (authData: AuthResponse) => auth(authData),
                                                            onSuccess: (data) => {
                                                                if (data) {
                                                                    const {
                                                                        token,
                                                                    } = data;
                                                                    if (token) {
                                                                        dispatch(setToken(token));
                                                                    }

                                                                    onSuccess && onSuccess(data);
                                                                    dispatch(setAuthorized(true));
                                                                    navigate('/');
                                                                }
                                                            },
                                                            onError: (error) => {
                                                                console.error('Ошибка при выполнении мутации:', error);
                                                                if (error.status === 400) {
                                                                    console.error('Ошибка 400:', error.message);
                                                                } else if (error.status === 401) {
                                                                    console.error('Ошибка 401:', error.message);
                                                                } else {
                                                                    console.error('Ошибка при регистрации пользователя:', error);
                                                                }

                                                                onError && onError(error);
                                                            },
                                                        });
};
