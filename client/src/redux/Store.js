import { combineReducers, configureStore} from '@reduxjs/toolkit'
import useReducer from './User/userSlice'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import cartReducer from './Cart/CartSlice'
const rootReducer = combineReducers({
  user:useReducer,
  cart:cartReducer,
})

const PersistConfig={
  key:'root',
  storage,
  version:1,
}
const persistedReducer = persistReducer(PersistConfig,rootReducer)

export const Store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=> 
  getDefaultMiddleware({
    serializableCheck:false,
  })
})

export const persistor = persistStore(Store)