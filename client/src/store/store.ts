import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
                                        reducer: rootReducer,
                                        middleware: (getDefaultMiddleware) =>
                                            getDefaultMiddleware()
                                    });

// Типы для диспетчера и состояния
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
