import React from 'react';
import logo from './upicon.png';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<div className='flex justify-center pa3 pointer:hover: pointer'>
			<Link to='/'>
				<Tilt tiltMaxAngleX='50' tiltMaxAngleY='50'>
					<img className='br-100 ba bw2 b--white h3 w3' src={logo} alt='Logo' />
				</Tilt>
			</Link>
		</div>
	);
};

export default Logo;
