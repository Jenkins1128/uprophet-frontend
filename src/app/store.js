import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import signinReducer from '../features/containers/Signin/signinSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		signin: signinReducer
	}
});
