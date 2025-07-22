import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { setupListeners } from "@reduxjs/toolkit/query";

import counterReducer from "./reducers/counterSlice";
import popupReducer from "./reducers/popupSlice";
import authSlice from "./reducers/authSlice";
import cartSlice from "./reducers/cartSlice";
import productSlice from "./reducers/productSlice";

import { productsApi } from "../services/products";
import { categoriesApi } from "../services/categories";
import { signupApi } from "../services/signup";
import { loginApi } from "../services/login";
import { checkAuthenticationApi } from "../services/checkAuthentication";
import { cartApi } from "../services/cart";

const authPersistConfig = {
  key: "auth",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const productPersistConfig = {
  key: "products",
  storage,
};

const rootReducer = combineReducers({
  counter: counterReducer,
  popup: popupReducer,
  auth: persistReducer(authPersistConfig, authSlice),
  cart: persistReducer(cartPersistConfig, cartSlice),
  products: persistReducer(productPersistConfig, productSlice),

  [checkAuthenticationApi.reducerPath]: checkAuthenticationApi.reducer,
  [signupApi.reducerPath]: signupApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(checkAuthenticationApi.middleware)
      .concat(signupApi.middleware)
      .concat(loginApi.middleware)
      .concat(productsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(cartApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
