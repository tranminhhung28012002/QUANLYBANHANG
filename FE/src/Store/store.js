import { configureStore } from "@reduxjs/toolkit";

import filterModal from "./SlideModal";
import authReducer from "./authReducer.js";
const store = configureStore({
  reducer: {
    modal: filterModal,
    auth: authReducer,
  },
});

export default store;
