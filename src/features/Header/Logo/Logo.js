import React from 'react';
import logo from './upicon.png';
import Tilt from 'react-parallax-tilt';

const Logo = () => {
	return (
		<div className='flex ma3'>
			<Tilt tiltMaxAngleX='50' tiltMaxAngleY='50'>
				<img className='br-100 ba bw2 b--white h3 w3' src={logo} alt='Logo' />
			</Tilt>
		</div>
	);
};

export default Logo;
