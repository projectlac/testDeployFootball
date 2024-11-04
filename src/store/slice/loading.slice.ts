import { createSlice } from '@reduxjs/toolkit'

interface LoadingState {
  loading: {
    show: boolean
  }
}

const initialLoadingState = {
  loading: {
    show: false
  }
} as LoadingState

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoadingState,
  reducers: {
    show(state) {
      state.loading.show = true
    },
    hide(state) {
      state.loading.show = false
    }
  }
})

export const loadingAction = loadingSlice.actions
export const loadingReducer = loadingSlice.reducer
