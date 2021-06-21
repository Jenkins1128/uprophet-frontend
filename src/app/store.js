import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import signinReducer from '../features/containers/Signin/signinSlice';
import homeReducer from '../features/containers/Home/homeSlice';
import navReducer from '../features/presentationals/Navigation/navSlice';
//import changePasswordReducer from '../features/containers/ChangePassword/changePasswordSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		signin: signinReducer,
		home: homeReducer,
		nav: navReducer
		//changePassword: changePasswordReducer
	}
});
