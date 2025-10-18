import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice'
import jobSlice from './jobSlice'
import companySlice from './companySlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import applicationSlice from "./applicationSlice";



const persistConfig = {
    key: 'root', // Key for the storage
    version: 1,
    storage, // The storage medium (e.g., localStorage)
   
    // blacklist: ['someNonPersistentReducer'], // Optionally, specify which reducers NOT to persist
};
const rootReducer = combineReducers({
    auth:authSlice,
    job:jobSlice,
    company:companySlice,
    application:applicationSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store