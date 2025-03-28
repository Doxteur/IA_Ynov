// store.js
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import authReducer from './reducers/AuthReducers';
import ordersReducer from './reducers/OrdersReducers';
import { setStore } from './middlewares/ReduxMiddlewares';

// Create the logger
const logger = createLogger({
  duration: true, // Print the duration of each action
  colors: {
   title: () => '#139BFE',
   prevState: () => '#9E9E9E',
   action: () => '#149945',
   nextState: () => '#A47104',
  },
});

// Configuration for Redux Persist
const persistConfig = {
  key: 'root',
  storage,

};

// Combine all your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: ['payload.headers'],
        ignoredPaths: ['items.dates'],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

setStore(store);

// Create the persistor
export const persistor = persistStore(store);

// Appdispatch
export type AppDispatch = typeof store.dispatch;

// Rootstate
export type RootState = ReturnType<typeof store.getState>;
