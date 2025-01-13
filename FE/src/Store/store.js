import { configureStore } from "@reduxjs/toolkit";

import filterModal from "./SlideModal";

const store = configureStore({
  reducer: {
    modal: filterModal,
  },
});
export default store;
