import { configureStore } from '@reduxjs/toolkit'
import { initialReducer } from './reducers/initialReducer'

// TODO: Fix type error
export default configureStore({
	reducer: {
		initialReducer
	}
})
