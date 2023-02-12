import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import headerSlice from "./headerSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    header: headerSlice.reducer,
    order: orderSlice.reducer,
  },
});

export default store;
