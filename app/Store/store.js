import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice";
import salesReducer from "./SalesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    sales: salesReducer,
  },
});

export default store;
