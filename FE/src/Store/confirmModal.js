import { createSlice } from "@reduxjs/toolkit";

const confirmModal = createSlice({
  name: "confirmModal",
  initialState: {
    isOpen: false,
    modalType: "",
  },
  reducers: {
    openConfirmModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeConfirmModal: (state) => {
      state.isOpen = false;
      state.modalType = "";
    },
  },
});

export const { openConfirmModal, closeConfirmModal } = confirmModal.actions;
export default confirmModal.reducer;
