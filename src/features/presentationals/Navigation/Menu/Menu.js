import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
	const openNav = () => {
		document.getElementById('mySidenav').style.width = '100%';
	};

	const closeNav = () => {
		document.getElementById('mySidenav').style.width = '0';
	};

	return (
		<>
			<div id='mySidenav' class='sidenav'>
				<button className='closebtn' onClick={closeNav}>
					&times;
				</button>
				<Link to='/about' onClick={closeNav} className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib light-silver'>
					About
				</Link>
				<Link to='/signin' onClick={closeNav} className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib dark-green'>
					Sign in
				</Link>
				<Link to='/signup' onClick={closeNav} className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib white'>
					Sign up
				</Link>
				<a onClick={closeNav} className='f6 grow no-underline b--none b ba bw1 ph3 mh3 dib light-silver' rel='noopener noreferrer' href='https://youtu.be/Z7YR0zwMtTk?list=TLGGTOFWbVS80XMxODA1MjAyMQ' target='_blank'>
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
