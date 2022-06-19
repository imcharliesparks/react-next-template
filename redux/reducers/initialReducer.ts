import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitReducerActions, InitReducerState } from '../types'

const initialState: InitReducerState = {
	test: false
}

// TODO: Figure out typing issues
const update: CaseReducer = (state: InitReducerState, action: PayloadAction<boolean, InitReducerActions>) =>
	(state.test = action.payload)

export const initialReducer = createSlice({
	name: 'initialReducer',
	initialState,
	reducers: {
		update
	}
})
