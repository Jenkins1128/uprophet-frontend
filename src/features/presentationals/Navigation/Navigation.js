import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Bell from './bell.png';
import Compass from './compass.png';
import DefaultProfilePic from './defaultProfilePic.png';
import Logout from './logout.png';
import Menu from './Menu/Menu';

const Navigation = ({ isSignedIn }) => {
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-device-width: 1224px)'
	});
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 889px)' });
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	});
	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

	return isSignedIn ? (
		<nav className='flex justify-end pt5 mt5 '>
			<a href='#0' className='f6 grow pointer:hover b--none ph3 mh3 pv1 mb2 dib bg-transparent pointer:hover: pointer'>
				<img title='Notifications' className='w2 h2' alt='Notifications' src={Bell} />
			</a>
			<a href='#0' className='f6 grow pointer:hover b--none ph3 mh3 pv1 mb2 dib bg-transparent pointer:hover: pointer'>
				<img title='Explore' className='w2 h2' alt='Compass' src={Compass} />
			</a>
			<a href='#0' className='f6 grow no-underline br-100 ba bw1 mh3 pv3 ph3 mb2 dib bg-white b--white pointer:hover: pointer'>
				<img title='Profile' className='w1 h1' src={DefaultProfilePic} alt='Profile' />
			</a>
			<a href='#0' className='f6 grow pointer:hover b--none ph3 mh3 pv1 mb2 dib bg-transparent pointer:hover: pointer'>
				<img title='Logout' className='w2 h2' alt='Logout' src={Logout} />
			</a>
		</nav>
	) : (
		<nav className='flex items-center'>
			{(isDesktopOrLaptop || isTabletOrMobileDevice) && (
				<>
					{!(isTabletOrMobile || isPortrait) ? (
						<>
							<Link to='/about' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
								About
							</Link>
							<Link to='/signin' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
								Sign in
							</Link>
							<Link to='/signup' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
								Sign up
							</Link>
							<a className='f6 grow no-underline b--none b ba bw1 ph3 mh3 dib black hover-white' rel='noopener noreferrer' href='https://youtu.be/Z7YR0zwMtTk?list=TLGGTOFWbVS80XMxODA1MjAyMQ' target='_blank'>
								Video
							</a>
						</>
					) : (
						<Menu />
					)}
				</>
			)}
		</nav>
	);
};

export default Navigation;
