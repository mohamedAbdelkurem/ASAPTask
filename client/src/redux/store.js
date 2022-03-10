import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth";
import  footerReducer from "./footer"
import  serviceReducer from "./service"


export const store = configureStore({
  reducer: {
    auth: authReducer,
services:serviceReducer,
footers:footerReducer,


  },
  middleware: [...getDefaultMiddleware()],
});
