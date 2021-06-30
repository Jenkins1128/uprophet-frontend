import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import signinReducer from '../features/containers/Signin/signinSlice';
import homeReducer from '../features/containers/Home/homeSlice';
import commentsReducer from '../features/containers/QuoteComments/quoteCommentsSlice';
import postCommentReducer from '../features/containers/QuoteComments/postCommentSlice';
import getQuotePostReducer from '../features/containers/QuoteComments/getQuotePostSlice';
import postQuoteReducer from '../features/containers/Home/postQuoteSlice';
import getUserReducer from '../features/presentationals/Header/getUserSlice';
import getNotificationCountReducer from '../features/presentationals/Header/getNotificationCountSlice';
import exploreQuotesReducer from '../features/containers/Explore/exploreQuotesSlice';
//import changePasswordReducer from '../features/containers/ChangePassword/changePasswordSlice';
export const store = configureStore({
	reducer: {
		counter: counterReducer,
		signin: signinReducer,
		home: homeReducer,
		comments: commentsReducer,
		postComment: postCommentReducer,
		quotePost: getQuotePostReducer,
		postQuote: postQuoteReducer,
		getUser: getUserReducer,
		notificationCount: getNotificationCountReducer,
		exploreQuotes: exploreQuotesReducer

		//changePassword: changePasswordReducer
	}
});
