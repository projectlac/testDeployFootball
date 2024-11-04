import { ThunkDispatch, UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import data from './data'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loadingReducer } from '../slice/loading.slice'
import { metadataReducer } from '../slice/metadata.slice'
import { userReducer } from '../slice/user.slice'
import storage from './storage'

const rootReducer = combineReducers({
  loading: loadingReducer,
  metadata: metadataReducer,
  user: userReducer,
  data
})

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['data']
  },
  rootReducer
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const persistor = persistStore(store)