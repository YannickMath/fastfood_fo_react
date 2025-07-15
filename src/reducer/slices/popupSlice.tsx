import { createSlice } from "@reduxjs/toolkit";

interface PopupState {
  message: string | null;
  visible: boolean;
}

const initialState: PopupState = {
  message: null,
  visible: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    showPopup: (state, action) => {
      state.message = action.payload;
      state.visible = true;
    },
    hidePopup: (state) => {
      state.message = null;
      state.visible = false;
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;
export default popupSlice.reducer;
