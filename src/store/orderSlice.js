import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetail: [],
  },
  reducers: {
    setOrderDetail(state, action) {
      const orderDetail = action.payload;
      state.orderDetail = orderDetail;
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
