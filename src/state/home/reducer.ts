/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit'

import { updateTab } from './actions'

export interface HomeState {
  tabs: string[]
  activeTab: string
}

export const initialState: HomeState = {
  tabs: [],
  activeTab: 'normal',
}

export default createReducer(initialState, builder =>
  builder.addCase(updateTab, (state, { payload }) => {
    state.activeTab = payload
  }),
)
