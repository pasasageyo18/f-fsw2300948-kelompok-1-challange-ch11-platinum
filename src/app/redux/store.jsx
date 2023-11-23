'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth'
import gameReducer from './gameSlice/index'
import playedReducer from './playAgain/playAgain'

const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  played: playedReducer,
  //add another reducer here
})

export const store = configureStore({
  reducer: rootReducer,
})
