import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationReducer';
import logger from 'redux-logger'

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});