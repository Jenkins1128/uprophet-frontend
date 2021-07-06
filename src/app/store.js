import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/containers/Home/homeSlice';
import commentsReducer from '../features/containers/QuoteComments/quoteCommentsSlice';
import postCommentReducer from '../features/containers/QuoteComments/postCommentSlice';
import getQuotePostReducer from '../features/containers/QuoteComments/getQuotePostSlice';
import postQuoteReducer from '../features/containers/Home/postQuoteSlice';
import getUserReducer from '../features/presentationals/Header/getUserSlice';
import getNotificationCountReducer from '../features/presentationals/Header/getNotificationCountSlice';
import exploreQuotesReducer from '../features/containers/Explore/exploreQuotesSlice';
import searchReducer from '../features/containers/Searchresults/searchSlice';
import profileReducer from '../features/containers/Profile/profileSlice';
import userInfoReducer from '../features/containers/Profile/userInfoSlice';
import favoritersReducer from '../features/containers/Favoriters/favoritersSlice';
import favoritingReducer from '../features/containers/Favoriting/favoritingSlice';
import notificationsReducer from '../features/containers/Notifications/notificationsSlice';
import currentUserInfoReducer from '../features/containers/Profile/EditProfile/currentUserInfoSlice';
import editBioReducer from '../features/containers/Profile/EditProfile/editBioSlice';
import editPhotoReducer from '../features/containers/Profile/EditProfile/editPhotoSlice';

export const store = configureStore({
	reducer: {
		home: homeReducer,
		comments: commentsReducer,
		postComment: postCommentReducer,
		quotePost: getQuotePostReducer,
		postQuote: postQuoteReducer,
		getUser: getUserReducer,
		notificationCount: getNotificationCountReducer,
		exploreQuotes: exploreQuotesReducer,
		search: searchReducer,
		profile: profileReducer,
		userInfo: userInfoReducer,
		favoriters: favoritersReducer,
		favoriting: favoritingReducer,
		notifications: notificationsReducer,
		currentUserInfo: currentUserInfoReducer,
		changeBio: editBioReducer,
		changePhoto: editPhotoReducer
	}
});
