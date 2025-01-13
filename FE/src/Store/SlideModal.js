import { createSlice } from "@reduxjs/toolkit";

const filterModal = createSlice({
  name: "filterModal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = filterModal.actions; // Đảm bảo xuất đúng
export default filterModal.reducer;
