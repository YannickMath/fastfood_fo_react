import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import { productsByCategoryApi } from "../services/productsByCategory";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoriesApi } from "../services/categories";
import { productsApi } from "../services/products";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [productsByCategoryApi.reducerPath]: productsByCategoryApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsByCategoryApi.middleware)
      .concat(productsApi.middleware)
      .concat(categoriesApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
