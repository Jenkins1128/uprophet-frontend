import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/containers/Home/redux/homeSlice';
import commentsReducer from '../features/containers/QuoteComments/redux/quoteCommentsSlice';
import postCommentReducer from '../features/containers/QuoteComments/redux/postCommentSlice';
import getQuotePostReducer from '../features/containers/QuoteComments/redux/getQuotePostSlice';
import postQuoteReducer from '../features/containers/Home/redux/postQuoteSlice';
import getUserReducer from '../features/presentationals/Header/redux/getUserSlice';
import getNotificationCountReducer from '../features/presentationals/NotiDot/redux/getNotificationCountSlice';
import exploreQuotesReducer from '../features/containers/Explore/redux/exploreQuotesSlice';
import searchReducer from '../features/containers/Searchresults/redux/searchSlice';
import profileReducer from '../features/containers/Profile/redux/profileSlice';
import userInfoReducer from '../features/containers/Profile/redux/userInfoSlice';
import favoritersReducer from '../features/containers/Favoriters/redux/favoritersSlice';
import favoritingReducer from '../features/containers/Favoriting/redux/favoritingSlice';
import notificationsReducer from '../features/containers/Notifications/redux/notificationsSlice';
import currentUserInfoReducer from '../features/containers/Profile/EditProfile/redux/currentUserInfoSlice';
import editBioReducer from '../features/containers/Profile/EditProfile/redux/editBioSlice';
import editPhotoReducer from '../features/containers/Profile/EditProfile/redux/editPhotoSlice';

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
