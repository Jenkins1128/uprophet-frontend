import React from 'react';
import Logo from './Logo/Logo';

import Navigation from '../Navigation/Navigation';

const Header = ({ isSignedIn }) => {
	return (
		<header className='flex justify-between z-1 fixed top-0 bb bw1 b--light-green bg-light-green'>
			<Logo isSignedIn={isSignedIn} />
			<Navigation isSignedIn={isSignedIn} />
		</header>
	);
};

export default Header;
