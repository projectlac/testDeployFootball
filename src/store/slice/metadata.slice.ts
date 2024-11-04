import { getMetaData } from '@/resources/api-constants'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface FetchMetaDataParams {
  type?: string
  slug?: string
  url?: string
  language?: string
}

const initialMetadataState = {
  metadata: {
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    content_top: '',
    content_bottom: '',
    content_footer: '',
    canonical: '',
    image: ''
  },
  type: '',
  language: '',
  slug: '',
  url: ''
}

const metadataSlice = createSlice({
  name: 'metadata',
  initialState: initialMetadataState,
  reducers: {
    setMetadata(state, action) {
      return { ...state, ...action.payload }
    },
    getMetadata(state) {
      return state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetaData.fulfilled, () => {
        // Update state với dữ liệu API đã hoàn thành nếu cần
      })
      .addCase(fetchMetaData.rejected, () => {
        // Xử lý khi API call thất bại nếu cần
      })
  }
})

export const fetchMetaData = createAsyncThunk('metadata/fetchMetaData', async (params: FetchMetaDataParams, { dispatch }) => {
  try {
    const response = await getMetaData(params)
    // Assuming the response data matches the state structure
    dispatch(setMetadata(response.data))
  } catch (error) {
    console.error('Failed to fetch metadata:', error)
    // Handle error if needed
  }
})

export const { setMetadata, getMetadata } = metadataSlice.actions
export const metadataReducer = metadataSlice.reducer
