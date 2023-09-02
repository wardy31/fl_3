import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "reciept",
  initialState: {
    get: {
      data: [],
      loading: false,
      error: false,
    },
    post: {
      loading: false,
      error: false,
    },
    delete: {
      loading: false,
      error: false,
    },
  },
  reducers: {
    getData: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        [payload.type]: {
          ...state.get,
          data: payload.data,
        },
      };
    },
    loading: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        [payload.type]: {
          ...state[payload.typeo],
          loading: payload.data,
        },
      };
    },
  },
});

export const { getData, loading } = slice.actions;
export default slice.reducer;
