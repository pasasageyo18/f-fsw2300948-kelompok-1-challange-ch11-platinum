import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  played: false,
}

export const playedSlice = createSlice({
  name: 'played',
  initialState,
  reducers: {
    isPlayed: (state) => {
      state.played = true
    },
    neverPlayed: (state) => {
      state.played = false
    },
  },
})

export const { isPlayed, neverPlayed } = playedSlice.actions

export default playedSlice.reducer
