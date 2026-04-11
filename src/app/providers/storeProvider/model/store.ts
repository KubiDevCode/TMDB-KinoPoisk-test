import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { tmdbApi } from '../../../../shared/api/tmdbApi'

// потом сюда добавишь:
// import themeReducer from '@/features/theme/model/themeSlice'
// import favoritesReducer from '@/features/favorites/model/favoritesSlice'

export const store = configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        // theme: themeReducer,
        // favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch