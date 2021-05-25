import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './upicon.png';

const Menu = () => {
	const openNav = () => {
		document.getElementById('mySidenav').style.width = '100%';
	};

	const closeNav = () => {
		document.getElementById('mySidenav').style.width = '0';
	};

	return (
		<>
			<div id='mySidenav' className='sidenav'>
				<button className='closebtn' onClick={closeNav}>
					&times;
				</button>

				<Link to='/' onClick={closeNav} className='f6 grow b'>
					<img title='Home' className='br-100 ba bw2 ma2 b--white h3 w3 pointer:hover: pointer' src={Logo} alt='Logo' />
				</Link>
				<Link to='/about' onClick={closeNav} className='f6 grow b'>
					About
				</Link>
				<Link to='/signin' onClick={closeNav} className='f6 grow b'>
					Sign in
				</Link>
				<Link to='/signup' onClick={closeNav} className='f6 grow b'>
					Sign up
				</Link>
				<a onClick={closeNav} className='f6 grow b' rel='noopener noreferrer' href='https://youtu.be/Z7YR0zwMtTk?list=TLGGTOFWbVS80XMxODA1MjAyMQ' target='_blank'>
					Video
				</a>
			</div>
			<button className='menuIconSize mr2 pointer:hover: pointer b--none bg-transparent hover-white' onClick={openNav}>
				&#9776;
			</button>
		</>
	);
};

export default Menu;
