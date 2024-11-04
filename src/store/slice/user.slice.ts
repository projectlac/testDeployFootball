import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  user: {
    access_token: string
    token_type: string
    expires_in: number
    user_name: string
    email: string
    name: string
  } | null
}

const initialUserState = {
  user: null
} as UserState

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.user = { ...state.user, ...action.payload }
    },
    clearUser(state, action) {
      state.user = action.payload
    }
  }
})

export const userAction = userSlice.actions
export const userReducer = userSlice.reducer
