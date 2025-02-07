import { configureStore } from "@reduxjs/toolkit";

import filterModal from "./SlideModal";
import authReducer from "./authReducer.js";
import confirmModalReducer from "./confirmModal.js";
const store = configureStore({
  reducer: {
    modal: filterModal,
    auth: authReducer,
    confirmModal: confirmModalReducer,
  },
});

export default store;
