import React, { useEffect } from 'react';
import Logo from './Logo/Logo';

import Navigation from '../Navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, selectCurrentUser } from './getUserSlice';
import { getNotificationCountAsync, selectNotificationCount } from './getNotificationCountSlice';

const Header = ({ notiDotOff }) => {
	const currentUser = useSelector(selectCurrentUser);
	const notificationCount = useSelector(selectNotificationCount);

	return (
		<header className='flex justify-between z-1 fixed top-0 bb bw1 b--light-green bg-light-green'>
			{console.log(currentUser)}
			<Logo isSignedIn={currentUser !== '' ? true : false} />
			<Navigation hasNotifications={notificationCount > 0 ? true : false} currentUser={currentUser} isSignedIn={currentUser !== '' ? true : false} notiDotOff={notiDotOff} />
		</header>
	);
};

export default Header;
