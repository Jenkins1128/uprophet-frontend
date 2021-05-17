import React from 'react';
import Logo from './Logo/Logo';

const Header = () => {
	return (
		<div className='z-1 fixed top-0 w-100 bb bw1 b--light-green bg-light-green'>
			<Logo />
		</div>
	);
};

export default Header;
