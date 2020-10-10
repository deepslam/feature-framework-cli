import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NewSliceStateType = {};

const initialState: NewSliceStateType = {};

const slice = createSlice({
  name: 'NewSlice',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<NewSliceStateType>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export default slice;
