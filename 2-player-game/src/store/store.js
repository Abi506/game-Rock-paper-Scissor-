// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // Use session storage
import usersReducer from '../slice/slice';

// Config for redux-persist
const persistConfig = {
  key: 'root', // The key for the persisted state
  storage, // Use session storage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, usersReducer);

// Create the Redux store
const store = configureStore({
  reducer: {
    usersInfo: persistedReducer, // Use the persisted reducer
  },
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
