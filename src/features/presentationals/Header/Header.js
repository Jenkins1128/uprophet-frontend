import React, { useEffect, useRef } from 'react';
import Logo from './Logo/Logo';

import Navigation from '../Navigation/Navigation';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './getUserSlice';

const Header = () => {
	const currentUser = useSelector(selectCurrentUser);
	const mounted = useRef(null);

	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);

	return (
		<header className='flex justify-between z-1 fixed top-0 bb bw1 b--light-green bg-light-green'>
			<Logo isSignedIn={currentUser !== '' ? true : false} />
			<Navigation isMounted={mounted.current} currentUser={currentUser} isSignedIn={currentUser !== '' ? true : false} />
		</header>
	);
};

export default Header;
