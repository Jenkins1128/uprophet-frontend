import React from 'react';
import Logo from './Logo/Logo';
import Search from './Search/Search';
import Navigation from '../Navigation/Navigation';

const Header = ({ isSignedIn }) => {
	return !isSignedIn ? (
		<header className='flex justify-between z-1 fixed top-0 bb bw1 b--light-green bg-light-green'>
			<Logo />
			<Navigation isSignedIn={isSignedIn} />
		</header>
	) : (
		<header className='flex justify-between z-1 fixed top-0  bb bw1 b--light-green bg-light-green'>
			<Logo />
			<Navigation isSignedIn={isSignedIn} />
			<Search />
		</header>
	);
};

export default Header;
