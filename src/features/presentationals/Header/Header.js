import React, { useEffect, useState } from 'react';
import Logo from './Logo/Logo';

import Navigation from '../Navigation/Navigation';
import { useDispatch } from 'react-redux';
import { getUserAsync } from './headerSlice';

const Header = ({ isSignedIn }) => {
	const [currentUser, setCurrentUser] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserAsync('http://localhost:3001/currentUser')).then((res) => {
			console.log(res);
			if (res.meta.requestStatus === 'fulfilled') {
				setCurrentUser(res.payload);
			}
		});
	}, [dispatch]);

	return (
		<header className='flex justify-between z-1 fixed top-0 bb bw1 b--light-green bg-light-green'>
			<Logo isSignedIn={isSignedIn} />
			<Navigation currentUser={currentUser} isSignedIn={isSignedIn} />
		</header>
	);
};

export default Header;
