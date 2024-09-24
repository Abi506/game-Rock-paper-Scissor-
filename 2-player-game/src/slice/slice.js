// src/slice/slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  player1Name: '',
  player2Name: '',
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPlayer1: (state, action) => {
      state.player1Name = action.payload;
    },
    setPlayer2: (state, action) => {
      state.player2Name = action.payload;
    },
  },
});

export const { setPlayer1, setPlayer2 } = usersSlice.actions;
export default usersSlice.reducer;
