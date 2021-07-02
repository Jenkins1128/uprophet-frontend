import React, { useEffect, useState } from 'react';
import Logo from './Logo/Logo';

import Navigation from '../Navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, selectCurrentUser } from './getUserSlice';

const Header = ({ isSignedIn }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);

	useEffect(() => {
		dispatch(getUserAsync('http://localhost:3001/currentUser'));
	}, [dispatch]);

	return (
		<header className='flex justify-between z-1 fixed top-0 bb bw1 b--light-green bg-light-green'>
			<Logo isSignedIn={isSignedIn} />
			<Navigation currentUser={currentUser} isSignedIn={isSignedIn} />
		</header>
	);
};

export default Header;
