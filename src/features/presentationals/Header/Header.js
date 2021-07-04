import React, { useEffect, useState } from 'react';
import Logo from './Logo/Logo';

import Navigation from '../Navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, selectCurrentUser } from './getUserSlice';
import { getNotificationCountAsync, selectNotificationCount } from './getNotificationCountSlice';

const Header = ({ isSignedIn, notiDotOff }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const notificationCount = useSelector(selectNotificationCount);

	useEffect(() => {
		dispatch(getUserAsync('http://localhost:3001/currentUser'));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getNotificationCountAsync('http://localhost:3001/getNotificationCount'));
	}, [dispatch]);

	return (
		<header className='flex justify-between z-1 fixed top-0 bb bw1 b--light-green bg-light-green'>
			<Logo isSignedIn={isSignedIn} />
			<Navigation hasNotifications={notificationCount > 0 ? true : false} currentUser={currentUser} isSignedIn={isSignedIn} notiDotOff={notiDotOff} />
		</header>
	);
};

export default Header;
