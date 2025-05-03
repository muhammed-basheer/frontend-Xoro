import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "../redux/user/userSlice";

// Combine all reducers (for now we only have userReducer)
const rootReducer = combineReducers({
    user: userReducer,
});

// Config for redux-persist (stores in localStorage)
const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

// Wrap root reducer with persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store with peristed reducer

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false,
    }),
})

// Create persistor
export const persistor = persistStore(store);
