import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../services/axios'
export interface HomeState {
  tabs: string[]
  activeTab: string
  loading: boolean
  error: string
}

export const initialState: HomeState = {
  tabs: [],
  activeTab: 'normal',
  loading: false,
  error: '',
}

export const fetchList = createAsyncThunk('home/fetchList', async ({ page, size }: { page: number; size: number }) => {
  const response = await http.get('https://mock.xiaojukeji.com/mock/15175/products')
  return response.data
})

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    updateTab: (state, action: PayloadAction<{ activeTab: string }>) => {
      state.activeTab = action.payload.activeTab
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchList.fulfilled, (state, action: PayloadAction<any>) => {
      state.tabs = action.payload
      state.loading = false
    })
    builder.addCase(fetchList.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
    })
    builder.addCase(fetchList.pending, (state, action: PayloadAction<any>) => {
      state.loading = true
    })
  },
})

export const { updateTab } = HomeSlice.actions

export const HomePageReducer = HomeSlice.reducer
