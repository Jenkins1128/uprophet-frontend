import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import signinReducer from '../features/containers/Signin/signinSlice';
import homeReducer from '../features/containers/Home/homeSlice';
import commentsReducer from '../features/containers/QuoteComments/quoteCommentsSlice';
import postCommentReducer from '../features/containers/QuoteComments/postCommentSlice';
//import changePasswordReducer from '../features/containers/ChangePassword/changePasswordSlice';
export const store = configureStore({
	reducer: {
		counter: counterReducer,
		signin: signinReducer,
		home: homeReducer,
		comments: commentsReducer,
		postComment: postCommentReducer
		//changePassword: changePasswordReducer
	}
});
