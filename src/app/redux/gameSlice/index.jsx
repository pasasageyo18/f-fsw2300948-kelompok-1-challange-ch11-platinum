import { createSlice } from '@reduxjs/toolkit'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    playerChoice: null,
    computerChoice: null,
    choices: ['rock', 'paper', 'scissor'],
    total_score: 0,
    round: 1,
    result: null,
  },
  reducers: {
    setPlayerChoice(state, action) {
      state.playerChoice = action.payload
    },
    setComputerChoice(state) {
      const idx = Math.floor(Math.random() * state.choices.length)
      state.computerChoice = state.choices[idx]
    },
    setDraw(state) {
      state.result = 'draw'
      state.round = state.round + 1
    },
    setLose(state) {
      state.result = 'lose'
      state.total_score = state.total_score - 1
      state.round = state.round + 1
    },
    setWin(state) {
      state.result = 'win'
      state.total_score = state.total_score + 3
      state.round = state.round + 1
    },
    resetGameState(state) {
      // Reset the game state to initial values
      state.playerChoice = null
      state.computerChoice = null
    },
  },
})
export const {
  setPlayerChoice,
  setComputerChoice,
  setDraw,
  setLose,
  setWin,
  resetGameState,
} = gameSlice.actions
export default gameSlice.reducer
