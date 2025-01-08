import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authUserSlice";
import deviceReducer from "./deviceTokenSlice";
import { ordersApiSlice } from "./api/OrderApiSlice";
import { authApiSlice } from "./api/AuthApiSlice";
import { productApiSlice } from "./api/ProductApiSlice";
import { storeApiSlice } from "./api/StoreApiSlice";
import { userApiSlice } from "./api/UserApiSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    authUser: authReducer,
    deviceToken: deviceReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [ordersApiSlice.reducerPath]: ordersApiSlice.reducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [storeApiSlice.reducerPath]: storeApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(ordersApiSlice.middleware)
      .concat(productApiSlice.middleware)
      .concat(storeApiSlice.middleware)
      .concat(userApiSlice.middleware),
});

export default store;
