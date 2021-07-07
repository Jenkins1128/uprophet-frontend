import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './upicon.png';
import Bell from '../bell.png';
import Compass from '../compass.png';
import Home from '../home.png';
import Logout from '../logout.png';
import Userphoto from '../../../containers/Userphoto/Userphoto';
import RedDot from '../reddot.png';

const Menu = ({ isSignedIn, hasNotifications, notiDotOff, logout, currentUser }) => {
	const openNav = () => {
		document.getElementById('mySidenav').style.width = '100%';
	};

	const closeNav = () => {
		document.getElementById('mySidenav').style.width = '0';
	};

	const signout = () => {
		logout();
		closeNav();
	};

	return (
		<>
			{isSignedIn ? (
				<div id='mySidenav' className='sidenav'>
					<button className='closebtn mt1 mr2 pr0' onClick={closeNav}>
						&times;
					</button>
					<Link
						to={{
							pathname: '/',
							state: {
								isIn: true
							}
						}}
						onClick={closeNav}
						className='f6 grow b'
					>
						<img title='Home' className='br-100 ba bw2 ma2 b--white h3 w3 pointer' src={Logo} alt='Logo' />
					</Link>
					<Link
						to={{
							pathname: '/',
							state: {
								isIn: true
							}
						}}
						onClick={closeNav}
						className='f6 grow b'
					>
						<div className='flex items-center'>
							<img title='Home' className='w2 h2' alt='Home' src={Home} />
							&nbsp;{'Home'}
						</div>
					</Link>
					<Link to='/notifications' onClick={closeNav} className='f6 grow b'>
						<div className='flex items-center'>
							<div className='relative'>
								<img title='Notifications' className='w2 h2' alt='Notifications' src={Bell} />
								{hasNotifications && !notiDotOff && <img alt='notidot' className='absolute left-1 h1 w1' src={RedDot} />}
							</div>
							&nbsp;{'Notifications'}
						</div>
					</Link>
					<Link to='/explore' onClick={closeNav} className='f6 grow b'>
						<div className='flex items-center'>
							<img title='Explore' className='w2 h2' alt='Compass' src={Compass} />
							&nbsp;{'Explore'}
						</div>
					</Link>
					<Link to={`/${currentUser}`} onClick={closeNav} className='f6 grow b '>
						<div className='flex items-center'>
							<Userphoto size={'header'} username={currentUser} />
							&nbsp;{'Profile'}
						</div>
					</Link>
					<Link to='#' onClick={signout} className='f6 grow b'>
						<div className='flex items-center'>
							<img title='Logout' className='w2 h2' alt='Logout' src={Logout} />
							&nbsp;{'Logout'}
						</div>
					</Link>
				</div>
			) : (
				<div id='mySidenav' className='sidenav'>
					<button className='closebtn mt1 mr2 pr0' onClick={closeNav}>
						&times;
					</button>

					<Link
						to={{
							pathname: '/',
							state: {
								isIn: false
							}
						}}
						onClick={closeNav}
						className='f6 grow b'
					>
						<img title='Home' className='br-100 ba bw2 ma2 b--white h3 w3 pointer' src={Logo} alt='Logo' />
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
			)}

			<button className='menuIconSize mr2 pr0 pointer b--none bg-transparent hover-white' onClick={openNav}>
				&#9776;
			</button>
		</>
	);
};

export default Menu;
