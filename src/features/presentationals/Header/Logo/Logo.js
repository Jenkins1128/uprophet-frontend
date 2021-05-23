import React from 'react';
import logo from './upicon.png';
import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<article className='flex items-center'>
			<Link to='/'>
				<img title='Home' className='br-100 ba bw2 ma2 b--white h3 w3 pointer:hover: pointer' src={logo} alt='Logo' />
			</Link>
			<p className='f4 b white'>Uprophet</p>
		</article>
	);
};

export default Logo;
